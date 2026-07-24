import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import * as controller from "../controllers/editorController.js";

const router = express.Router();

router.use(protectRoute);
router.get("/my-posts", controller.getAuthorPosts);
router.post("/posts/create", controller.postCreatePost);
router.put("/posts/edit/:postId", controller.putEditPost);
router.post("/posts/publish/:postId", controller.postPublishPost);
router.post("/posts/unpublish/:postId", controller.postUnpublishPost);
router.delete("/posts/delete/:postId", controller.deletePost);

export default router;
