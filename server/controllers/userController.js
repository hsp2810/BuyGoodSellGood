import { getUserByID, terminateUser, updateUser } from "../database/user.js";

export const editUser = async (req, res) => {
	try {
		const { email, fName, lName, phone, password } = req.body;

		if (!fName || !lName || !phone || !password) {
			return res
				.status(400)
				.json({ message: "Please fill the credentials." });
		}

		const updatedUser = await updateUser({
			email,
			fName,
			lName,
			phone,
			password,
		});

		if (!updatedUser.value) {
			return res
				.status(500)
				.json({ message: "Error occured while updating the user." });
		}

		res.status(200).json({ message: "User updated successfully" });
	} catch (error) {
		console.log("Backend error in editing the user.");
	}
};

export const deactivateUser = async (req, res) => {
	try {
		const { user_id } = req.body;

		if (!user_id) {
			return res
				.status(401)
				.json({ message: "Proper ID was not sent from the frontend" });
		}

		const user = await getUserByID(user_id);

		if (!user) {
			return res
				.status(501)
				.json({ message: "No user found based on the ID passed" });
		}

		const isActive = user.isActive;

		if (!isActive) {
			return res
				.status(402)
				.json({ message: "User is already deactivated" });
		}

		const deactivate = await terminateUser(user_id);
		res.status(200).json({ message: "User deactivated successfully" });
	} catch (error) {
		console.log("Backend error in deactivating the user");
	}
};
