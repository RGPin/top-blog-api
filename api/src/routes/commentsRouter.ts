import express from "express";
import * as controller from "../controllers/commentsController.js";

const router = express.Router();

router.get("/:postId", controller.getComments);
router.post("/createComment/:postId", controller.postCreateComment);
router.put("/edit/:commentId", controller.putEditComment);
router.delete("/deleteComment/:commentId", controller.deleteComment);

export default router;
