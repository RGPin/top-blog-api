import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import * as controller from "../controllers/userController.js";

const router = express.Router();

router.get("/posts", controller.getPosts);
router.get("/posts/:postId", controller.getPostDetails);

router.use(protectRoute);
router.post("/posts/comments/:postId", controller.postCreateComment);
router.put("/posts/comments/:commentId", controller.putEditComment);
router.delete("/comments/:commentId", controller.deleteComment);

export default router;
