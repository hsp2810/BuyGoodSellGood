import express from "express";
import { deactivateUser, editUser } from "../controllers/userController.js";
import Authenticate from "../middleware/authenticate.js";
const router = express.Router();

router.route("/personalinformation").post(Authenticate, editUser);
router.route("/deactivate").post(Authenticate, deactivateUser);

export default router;
