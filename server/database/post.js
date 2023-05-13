import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.uri;

export const getPosts = async () => {
	try {
		const client = new MongoClient(uri);
		const aggregate = await client
			.db("saitdb")
			.collection("posts")
			.aggregate([
				{
					$lookup: {
						from: "items",
						localField: "item",
						foreignField: "_id",
						as: "item",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$project: {
						"owner.password": 0,
						"owner.isAdmin": 0,
						"owner.isActive": 0,
					},
				},
			])
			.toArray();
		return aggregate;
	} catch (error) {
		console.log("Database error in getting the posts: ", error);
	}
};

export const getPostByID = async (id) => {
	try {
		const client = new MongoClient(uri);
		const objID = new ObjectId(id);
		const aggregate = await client
			.db("saitdb")
			.collection("posts")
			.aggregate([
				{
					$match: { _id: objID },
				},
				{
					$lookup: {
						from: "items",
						localField: "item",
						foreignField: "_id",
						as: "item",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$project: {
						"owner.password": 0,
						"owner.isAdmin": 0,
						"owner.isActive": 0,
					},
				},
			])
			.toArray();
		return aggregate;
	} catch (error) {
		console.log("Database error in getting the posts: ", error);
	}
};

export const getPostsByOwnerID = async (ownerId) => {
	try {
		const client = new MongoClient(uri);
		const objID = new ObjectId(ownerId);
		const aggregate = await client
			.db("saitdb")
			.collection("posts")
			.aggregate([
				{
					$match: { owner: objID },
				},
				{
					$lookup: {
						from: "items",
						localField: "item",
						foreignField: "_id",
						as: "item",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "owner",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$project: {
						"owner.password": 0,
						"owner.isAdmin": 0,
						"owner.isActive": 0,
					},
				},
			])
			.toArray();
		return aggregate;
	} catch (error) {
		console.log("Database error in getting the posts: ", error);
	}
};

export const insertPost = async (date, views, ownerID, itemID) => {
	try {
		const client = new MongoClient(uri);
		const objID = new ObjectId(ownerID);
		return await client
			.db("saitdb")
			.collection("posts")
			.insertOne({
				date_posted: new Date(date),
				views: views,
				owner: objID,
				item: itemID,
			});
	} catch (error) {
		console.log("Database error in getting the posts");
	}
};

export const deletePost = async (id) => {
	try {
		const client = new MongoClient(uri);
		const objID = new ObjectId(id);
		return await client
			.db("saitdb")
			.collection("posts")
			.findOneAndDelete({ _id: objID });
	} catch (error) {
		console.log("Database error in deleting the post based on the ID");
	}
};

export const updatePost = async (id) => {
	try {
		const client = new MongoClient(uri);
		return await client
			.db("saitdb")
			.collection("posts")
			.findOne({ _id: id });
	} catch (error) {
		console.log("Database error in getting the posts");
	}
};

// Saved
export const insertSavedPost = async (post_id, user_id) => {
	try {
		const client = new MongoClient(uri);
		const postID = new ObjectId(post_id);
		const userID = new ObjectId(user_id);
		return await client.db("saitdb").collection("saved").insertOne({
			user: userID,
			savedPost: postID,
		});
	} catch (error) {
		console.log("Database error in saving the post");
	}
};

export const getSavedPost = async (post_id, user_id) => {
	try {
		const client = new MongoClient(uri);
		const postID = new ObjectId(post_id);
		const userID = new ObjectId(user_id);
		return await client.db("saitdb").collection("saved").findOne({
			user: userID,
			savedPost: postID,
		});
	} catch (error) {
		console.log("Database error in saving the post");
	}
};

export const getSavedPostsByUserID = async (user_id) => {
	try {
		const client = new MongoClient(uri);
		const userID = new ObjectId(user_id);
		const aggregate = await client
			.db("saitdb")
			.collection("saved")
			.aggregate([
				{
					$match: { user: userID },
				},
				{
					$lookup: {
						from: "posts",
						localField: "savedPost",
						foreignField: "_id",
						as: "savedPost",
					},
				},
				{
					$lookup: {
						from: "users",
						localField: "savedPost.owner",
						foreignField: "_id",
						as: "owner",
					},
				},
				{
					$project: {
						"owner.password": 0,
						"owner.isAdmin": 0,
						"owner.isActive": 0,
					},
				},
				{
					$lookup: {
						from: "items",
						localField: "savedPost.item",
						foreignField: "_id",
						as: "item",
					},
				},
			])
			.toArray();
		return aggregate;
	} catch (error) {
		console.log("Database error in saving the post");
	}
};

export const deleteSavedPost = async (post_id, user_id) => {
	try {
		const client = new MongoClient(uri);
		const postID = new ObjectId(post_id);
		const userID = new ObjectId(user_id);

		return await client
			.db("saitdb")
			.collection("saved")
			.findOneAndDelete({ user: userID, savedPost: postID });
	} catch (error) {
		console.log("Database error in saving the post");
	}
};

export const updateViews = async (post_id, views) => {
	try {
		const client = new MongoClient(uri);
		const postID = new ObjectId(post_id);

		return await client
			.db("saitdb")
			.collection("posts")
			.findOneAndUpdate(
				{ _id: postID },
				{ $set: { views: views } },
				{ upsert: true, returnDocument: "after" }
			);
	} catch (error) {
		console.log("Database error in updating the views");
	}
};
