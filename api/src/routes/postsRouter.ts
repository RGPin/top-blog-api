import express from "express";
import * as controller from "../controllers/postsControllers.js";

const router = express.Router();

router.get("/", controller.getPosts);
router.get("/:postId", controller.getPostDetails);
router.post("/createPost", controller.postCreatePost);
router.put("/editPost/:postId", controller.putEditPost);
router.delete("/delete/:postId", controller.deletePost);

export default router;
