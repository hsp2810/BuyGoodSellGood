import express from "express";
import {
	addPost,
	addSavedPost,
	editPost,
	fetchPostByID,
	fetchPosts,
	fetchPostsByUserID,
	fetchSavedPostsByUserID,
	increaseViews,
	removePostByID,
	removeSavedPostByID,
} from "../controllers/postController.js";
import Authenticate from "../middleware/authenticate.js";
import upload from "../middleware/multer.js";
const router = express.Router();

router.route("/").get(Authenticate, fetchPosts);
router
	.route("/user")
	.get(Authenticate, fetchPostsByUserID)
	.post(Authenticate, removePostByID);
router.route("/user/update").post(upload.single("file"), editPost);
router.route("/user/saved/insert").post(Authenticate, addSavedPost);
router.route("/user/saved/fetch").post(Authenticate, fetchSavedPostsByUserID);
router.route("/user/saved/remove").post(Authenticate, removeSavedPostByID);
router.route("/post").post(fetchPostByID).put(Authenticate, increaseViews);
router.route("/post/insert").post(upload.single("file"), addPost);

export default router;
