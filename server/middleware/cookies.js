// Generating JWT token and storing it into browser cookies
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const generateJWTToken = (id, res) => {
	let token = jsonwebtoken.sign({ _id: id }, SECRET_KEY);
	// console.log("Token generated: ", token);

	res.cookie("authSAIT", token, {
		// expires: new Date(Date.now() + 900000),
		httpOnly: true,
	});
};

export default generateJWTToken;
