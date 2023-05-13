import express from "express";
import { login, logout, register } from "../controllers/authController.js";
import Authenticate from "../middleware/authenticate.js";
const router = express.Router();

router
	.route("/login")
	.get(Authenticate, (req, res) => {
		res.send(req.rootUser);
	})
	.post(login);
router.route("/register").post(Authenticate, register);
router.route("/logout").post(Authenticate, logout);
router.route("/home").get(Authenticate, (req, res) => {
	res.send(req.rootUser);
});

export default router;
