import { getUserByEmail, insertUser } from "../database/user.js";
import generateJWTToken from "../middleware/cookies.js";
import messages from "../middleware/messages.js";

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		let userExist = await getUserByEmail(email);
		if (!userExist) {
			return res.status(400).json({
				message: "User doesn't exist. Create one to be able to login",
			});
		}

		if (userExist.isActive === false) {
			return res
				.status(423)
				.json({
					message:
						"Your account is currently deactivated. Only the administrator can activate it back",
				});
		}

		if (userExist.password === password) {
			// console.log("User found in the database");
			generateJWTToken(userExist._id, res);
			res.status(200).json({ message: "Login successful" });
		} else {
			return res
				.status(400)
				.json({ message: messages.wrong_credentials });
		}
	} catch (error) {
		console.log("Backend Error in signing user to the DB: ", error);
	}
};

export const register = async (req, res) => {
	try {
		const { fName, lName, email, phone, password } = req.body;

		if (!fName || !lName || !email || !phone || !password) {
			return res.status(400).json({
				message: "Please enter all the credentials to register",
			});
		}

		let userExist = await getUserByEmail(email);
		if (userExist) {
			return res.status(400).json({
				message:
					"User with the email already exists. Try a different one",
			});
		}

		const addedUser = await insertUser({
			fName,
			lName,
			email,
			phone,
			password,
		});
		console.log("Added user to the database is: ", addedUser);
		res.status(200).json({
			message:
				"Registration Complete. Login with the registered credentials",
		});
	} catch (error) {
		console.log("Backend error in registering the user.");
	}
};

export const logout = async (req, res) => {
	try {
		if (!req.cookies.authSAIT) {
			return res.status(400).json({ message: "Cookies doesn't exists" });
		}
		// console.log(req.cookies.authCookies);
		res.clearCookie("authSAIT");
		res.status(200).json({
			message: "Cookies has been cleared. Redirecting back to login page",
		});
	} catch (error) {
		console.log(error);
	}
};
