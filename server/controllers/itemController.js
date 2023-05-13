import { getPostByID, getPosts } from "../database/post.js";

export const fetchItems = async (req, res) => {
	try {
		const posts = await getPosts();

		if (!posts) {
			return res.status(500).json({ message: "No posts found" });
		}

		res.status(200).json({ posts });
	} catch (error) {
		console.log("Backend error in fetching the posts");
	}
};

export const fetchItemByID = async (req, res) => {
	try {
		const id = req.body.id;

		if (!id) {
			return res
				.status(400)
				.json({ message: "Correct id wasn't send from the frontend" });
		}

		const post = await getPostByID(id);

		if (!post) {
			return res
				.status(500)
				.json({ message: "No post found based on the ID" });
		}

		res.status(200).json({ post });
	} catch (error) {
		console.log("Backend error in fetching the post based on the ID");
	}
};

export const removeItemByID = (req, res) => {};
