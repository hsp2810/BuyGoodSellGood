import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cloudinary from "cloudinary";

// importing other packages
import cors from "cors";
import cookieParser from "cookie-parser";

// variables from .env file
const PORT = process.env.PORT || 5000;
const URI = process.env.URI;

// configuring cloud using cloudinary
cloudinary.v2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

// Using the middlwares
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
);
app.use(cookieParser());
app.use(express.json());

// Importing the routes
import authRoute from "./routes/authRoute.js";
import postRoute from "./routes/postRoute.js";
import userRoute from "./routes/userRoute.js";
import { connectDB } from "./database/connection.js";

// All the routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/user", userRoute);

// Listening to the port
const start = async () => {
	try {
		await connectDB(URI);
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	} catch (error) {
		console.log("Error in connecting to the first time");
	}
};

start();
