import { MongoClient, ObjectId, ReturnDocument } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.URI;

export const getUserByEmail = async (email) => {
	const client = new MongoClient(uri);
	try {
		// await client.connect(); //It is not mandatory to write this
		return await client.db("saitdb").collection("users").findOne({ email });
	} catch (error) {
		console.log("Database error in login the user: ", error);
	} finally {
		client.close();
	}
};

export const insertUser = async ({ fName, lName, email, password }) => {
	const client = new MongoClient(uri);
	try {
		return await client
			.db("saitdb")
			.collection("users")
			.insertOne({ fName, lName, email, password });
	} catch (error) {
		console.log("Database error in inserting the user to the database");
	}
};

export const getUserByID = async (id) => {
	const client = new MongoClient(uri);

	try {
		const ObjID = new ObjectId(id);
		return await client
			.db("saitdb")
			.collection("users")
			.findOne({ _id: ObjID });
	} catch (error) {
		console.log(
			"Database error in getting the user based on the ID: ",
			error
		);
	}
};

export const getUsers = async () => {
	const client = new MongoClient(uri);

	try {
		return await client.db("saitdb").collection("users").find().toArray();
	} catch (error) {
		console.log("Database error in getting the users", error);
	}
};

export const updateUser = async ({ email, fName, lName, phone, password }) => {
	const client = new MongoClient(uri);
	try {
		return await client
			.db("saitdb")
			.collection("users")
			.findOneAndUpdate(
				{ email },
				{ $set: { fName, lName, phone, password } },
				{ upsert: true, returnDocument: "after" }
			);
	} catch (error) {
		console.log(
			"Database error in updating the user in the database: ",
			error
		);
	}
};

export const terminateUser = async (user_id) => {
	const client = new MongoClient(uri);
	const ObjID = new ObjectId(user_id);
	try {
		return await client
			.db("saitdb")
			.collection("users")
			.findOneAndUpdate(
				{ _id: ObjID },
				{ $set: { isActive: false } },
				{ upsert: true, returnDocument: "after" }
			);
	} catch (error) {
		console.log(
			"Database error in updating the user in the database: ",
			error
		);
	}
};
