import { MongoClient } from "mongoDB";

export const connectDB = async (uri) => {
	const client = new MongoClient(uri);
	try {
		await client.connect();
		console.log("Connected to the database");
	} catch (error) {
		console.log("Error in connecting to the database", error);
	} finally {
		await client.close();
	}
};
