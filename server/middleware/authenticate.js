import jsonwebtoken from "jsonwebtoken";
import { getUserByID } from "../database/user.js";

const Authenticate = async (req, res, next) => {
	try {
		// First if cookies exist in the browser, user has already login. So we grab the cookies from the browser
		const cookieToken = req.cookies.authSAIT;
		// console.log("Printing the cookies: ", cookieToken);

		if (!cookieToken) {
			return res
				.status(400)
				.json({ message: "Cookies doesn't exist in the browser" });
		}

		const verifiedUser = jsonwebtoken.verify(
			cookieToken,
			process.env.SECRET_KEY
		);

		// console.log(verifiedUser);
		const verifiedID = verifiedUser._id;

		// Finding the user based on the ID
		// console.log(verifiedID);
		const user = await getUserByID(verifiedID);
		// console.log("User fetched based on the ID: ", user);

		if (!user) {
			return res.status(400).json({
				message:
					"User doesn't found based on the cookies got from the browser",
			});
		}
		req.rootUser = user;
		req.rootID = verifiedID;
		next();
	} catch (error) {
		console.log(error);
	}
};

export default Authenticate;
