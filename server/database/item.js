import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.uri;

export const getItems = async () => {
	try {
		const client = new MongoClient(uri);
		return await client.db("saitdb").collection("items").find().toArray();
	} catch (error) {
		console.log("Database error in getting the items");
	}
};

export const getItemByID = async (id) => {
	try {
		const client = new MongoClient(uri);
		const objID = new ObjectId(id);
		return await client
			.db("saitdb")
			.collection("items")
			.findOne({ _id: objID });
	} catch (error) {
		console.log("Database error in getting the item based on the ID");
	}
};

export const getItemByOwnerID = async (ownerId) => {
	try {
		const client = new MongoClient(uri);
		const objID = new ObjectId(ownerId);
		return await client
			.db("saitdb")
			.collection("items")
			.findOne({ owner: objID });
	} catch (error) {
		console.log("Database error in getting the item based on the owner ID");
	}
};

export const insertItem = async ({
	public_id,
	url,
	title,
	overview,
	description,
	price,
	ownerID,
}) => {
	try {
		const client = new MongoClient(uri);
		const objID = new ObjectId(ownerID);
		return await client.db("saitdb").collection("items").insertOne({
			file: { public_id, url },
			title: title,
			overview: overview,
			description: description,
			price: price,
			owner: objID,
		});
	} catch (error) {
		console.log(
			"Database error in inserting the item in the database: ",
			error
		);
	}
};

export const deleteItem = async (id) => {
	try {
		const client = new MongoClient(uri);
		const objID = new ObjectId(id);
		return await client
			.db("saitdb")
			.collection("items")
			.findOneAndDelete({ _id: objID });
	} catch (error) {
		console.log("Database error in deleting the item based on the ID");
	}
};

export const updateItem = async ({
	_id,
	file,
	title,
	overview,
	description,
	price,
}) => {
	try {
		const client = new MongoClient(uri);
		const itemID = new ObjectId(_id);
		return await client
			.db("saitdb")
			.collection("items")
			.findOneAndUpdate(
				{ _id: itemID },
				{ $set: { file, title, overview, description, price } },
				{ upsert: true, returnDocument: "after" }
			);
	} catch (error) {
		console.log("Database error in getting the posts");
	}
};
