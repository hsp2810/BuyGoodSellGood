import {
	deleteItem,
	getItemByID,
	insertItem,
	updateItem,
} from "../database/item.js";
import {
	deletePost,
	deleteSavedPost,
	getPostByID,
	getPosts,
	getPostsByOwnerID,
	getSavedPost,
	getSavedPostsByUserID,
	insertPost,
	insertSavedPost,
	updateViews,
} from "../database/post.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "cloudinary";

//done-fetching all the posts except author's itself
export const fetchPosts = async (req, res) => {
	try {
		const allPosts = await getPosts();
		if (allPosts.length === 0) {
			return res
				.status(500)
				.json({ message: "Currently there are no posts" });
		}

		// console.log("User id: ", req.rootID);
		// console.log(
		// 	"Id of the owner of the post: ",
		// 	allPosts[0].owner[0]._id.toString()
		// );

		const filteredPosts = allPosts.filter((post) => {
			return post.owner[0]._id.toString() !== req.rootID;
		});
		if (!filteredPosts || filteredPosts.length === 0) {
			return res
				.status(500)
				.json({ message: "Currently there are no posts" });
		}

		res.status(200).json({ posts: filteredPosts });
	} catch (error) {
		console.log("Backend error in fetching the posts: ", error);
	}
};

//done
export const fetchPostByID = async (req, res) => {
	try {
		const id = req.body.id;
		if (!id) {
			return res
				.status(400)
				.json({ message: "Correct id wasnot sent from frontend" });
		}

		const post = await getPostByID(id);
		if (!post) {
			return res
				.status(500)
				.json({ message: "No post found based on the ID" });
		}

		res.status(200).json({
			post: post,
		});
	} catch (error) {
		console.log("Backend error in fetching the post based on the ID");
	}
};

//done
export const fetchPostsByUserID = async (req, res) => {
	try {
		const ownerID = req.rootID;
		if (!ownerID) {
			return res
				.status(400)
				.json({ message: "Owner ID not fetched properly" });
		}

		const ownerPosts = await getPostsByOwnerID(ownerID);
		console.log(ownerPosts);
		if (ownerPosts.length === 0) {
			return res
				.status(400)
				.json({ message: "Not posts found based on the owner ID" });
		}

		res.status(200).json({ posts: ownerPosts });
	} catch (error) {
		console.log("Backend error in fetching the owner's all the posts");
	}
};

//done
export const removePostByID = async (req, res) => {
	try {
		const postID = req.body.id;
		console.log("Passing the ID to the backend: ", postID);

		if (!postID) {
			return res
				.status(400)
				.json({ message: "Correct Id was not send from the frontend" });
		}

		const post = await getPostByID(postID);
		if (post.length === 0) {
			return res.status(500).json({ message: "Post doesn't exist." });
		}

		const itemID = post[0].item[0]._id.toString();
		if (itemID === undefined) {
			console.log("Item ID is undefined. Not able to delete the item");
		}
		const item = await getItemByID(itemID);

		if (!item) {
			return res.status(501).json({
				message: "Item not found",
			});
		}

		// Deleting the image from cloud as well
		await cloudinary.v2.uploader.destroy(item.file.public_id);

		// First I need to delete the item
		const deletedItem = await deleteItem(itemID);

		// Finally deleting the post
		const deletedPost = await deletePost(postID);

		res.status(200).json({
			message: "Post has been deleted successfully.",
		});
	} catch (error) {
		console.log("Backend error in deleting the post of the owner");
	}
};

export const addPost = async (req, res) => {
	try {
		const { date, ownerID, title, description, price, overview } = req.body;

		if (
			!date ||
			!ownerID ||
			!title ||
			!description ||
			!price ||
			!overview
		) {
			return res.status(400).json({
				message: "Please enter all the details about the product",
			});
		}

		const file = req.file;
		if (!file) {
			return res.status(400).json({ message: "File not found" });
		}

		const { content } = getDataUri(file);

		const mycloud = await cloudinary.v2.uploader.upload(content);

		// adding the item first
		const addedItem = await insertItem({
			public_id: mycloud.public_id,
			url: mycloud.secure_url,
			title,
			overview,
			description,
			price,
			ownerID,
		});
		// console.log("Added item is: ", addedItem);
		if (!addedItem) {
			return res.status(500).json({
				message: "Error in inserting the item. Try again laters",
			});
		}

		//Getting the ID as an instance of Object ID
		const addedItemID = addedItem.insertedId;
		// console.log("Printing the ID of the added item: ", addedItemID);

		// adding the post
		await insertPost(date, 0, ownerID, addedItemID);
		// console.log("Printing the added post: ", addedPost);
		res.status(200).json({ message: "Post inserted successfully." });
	} catch (error) {
		console.log(
			"Backend error in adding the post to the database: ",
			error
		);
	}
};

// Saved Posts by the user.

export const addSavedPost = async (req, res) => {
	try {
		const { post_id, user_id } = req.body;

		if (!post_id || !user_id) {
			return res.status(400).json({ message: "No proper values found" });
		}

		const postExist = await getSavedPost(post_id, user_id);

		if (postExist) {
			return res.status(501).json({ message: "Post already exists" });
		}

		const savedPost = await insertSavedPost(post_id, user_id);

		if (!savedPost.insertedId) {
			return res
				.status(500)
				.json({ message: "Not able to save the post to the database" });
		}

		return res.status(200).json({ message: "Post saved" });
	} catch (error) {
		console.log(
			"Backend error in adding the saved post to the database: ",
			error
		);
	}
};

export const fetchSavedPostsByUserID = async (req, res) => {
	try {
		const user_id = req.rootID;

		console.log("Root ID is: ", user_id);

		if (!user_id) {
			return res
				.status(400)
				.json({ message: "Please pass proper user ID" });
		}

		const savedPosts = await getSavedPostsByUserID(user_id);

		if (savedPosts && savedPosts.length === 0) {
			return res
				.status(500)
				.json({ message: "You haven't saved any posts." });
		}

		res.status(200).send(savedPosts);
	} catch (error) {
		console.log(
			"Backend error in adding the saved post to the database: ",
			error
		);
	}
};

export const removeSavedPostByID = async (req, res) => {
	try {
		const { post_id, user_id } = req.body;

		if (!post_id || !user_id) {
			return res.status(400).json({
				message:
					"Please provide with proper saved post id and the user id",
			});
		}

		const postExist = await getSavedPost(post_id, user_id);

		if (!postExist) {
			return res
				.status(501)
				.json({ message: "Can't remove any unsaved posts." });
		}

		const unsavedPost = await deleteSavedPost(post_id, user_id);

		console.log(unsavedPost);

		if (!unsavedPost) {
			return res
				.status(500)
				.json({ message: "Error in deleting the saved post" });
		}

		res.status(200).json({
			message: "Successfully removed the post from saved",
		});
	} catch (error) {
		console.log(
			"Backend error in adding the saved post to the database: ",
			error
		);
	}
};

export const increaseViews = async (req, res) => {
	try {
		const { post_id } = req.body;

		if (!post_id) {
			return res.status(401).json({
				message: "Proper post id was not passed from the frontend",
			});
		}

		const post = await getPostByID(post_id);

		if (!post) {
			return res.status(501).json({ message: "Post is null" });
		}

		const views = post[0].views;
		console.log(views + 1);

		console.log(typeof views);

		if (views === null) {
			return res.status(502).json({ message: "Views is null" });
		}

		const updatedPost = await updateViews(post_id, views + 1);

		if (!updatedPost) {
			return res
				.status(503)
				.json({ message: "Views didnot updated properly" });
		}

		res.status(200).json({ message: "views updated" });
	} catch (error) {
		console.log(
			"Backend error in updating the views to the database: ",
			error
		);
	}
};

export const editPost = async (req, res) => {
	try {
		// id here is the item id
		const { _id, title, description, overview, price } = req.body;

		if (!_id || !title || !description || !overview || !price) {
			return res.status(401).json({
				message: "Please enter all the fields to update the post.",
			});
		}

		const file = req.file;
		if (!file) {
			return res.status(400).json({ message: "File not found" });
		}

		const originalItem = await getItemByID(_id);

		console.log("Printing the item first: ", originalItem);

		//First delete the original image
		const deleted = await cloudinary.v2.uploader.destroy(
			originalItem.file.public_id
		);
		if (deleted.result === "not found") {
			console.log("Priting the deleted: ", deleted);
		}

		const fileUri = getDataUri(file);
		const uploadedImage = await cloudinary.v2.uploader.upload(
			fileUri.content
		);

		const editedItem = await updateItem({
			_id,
			file: {
				public_id: uploadedImage.public_id,
				url: uploadedImage.secure_url,
			},
			title,
			description,
			overview,
			price,
		});

		if (!editedItem) {
			return res
				.status(501)
				.json({ message: "Not able to update the item correctly" });
		}

		res.status(200).json({ message: "Item updated successfully" });
	} catch (error) {
		console.log("Backend error in updating the inventory post.");
	}
};
