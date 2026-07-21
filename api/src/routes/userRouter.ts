import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import * as controller from "../controllers/userController.js";

const router = express.Router();

router.get("/posts", controller.getPosts);
router.get("/posts/:postId", controller.getPostDetails);

router.use(protectRoute);
router.post("/comments/add/:postId", controller.postCreateComment);
router.put("/comments/edit/:commentId", controller.putEditComment);
router.delete("/comments/delete/:commentId", controller.deleteComment);

export default router;
