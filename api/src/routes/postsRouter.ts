import express from "express";

const router = express.Router();

router.get("/", (req, res) => res.send("Posts"));
router.get("/:postId", (req, res) => res.send("Post details with comments"));
router.post("/createPost", (req, res) => res.send("Create post"));
router.put("/editPost", (req, res) => res.send("Edit post"));
router.delete("/delete/:postId", (req, res) => res.send("Delete post"));

export default router;
