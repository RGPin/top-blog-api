import type { Request, Response } from "express";
import * as db from "../db/queries.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create middleware to prevent repeated codes (see if checks)

type CreatePostBody = {
  title: string;
  content?: string;
};

type EditPostParams = {
  postId: string;
};

type EditPostBody = {
  title?: string;
  content?: string;
};

type PostStatusParams = {
  postId: string;
};

type DeletePostParams = {
  postId: string;
};

export const getAuthorPosts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const authorId = req.user?.userId;

    if (!authorId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const authorPosts = await db.retrieveAuthorPosts(authorId);

    res.status(200).json({ authorPosts });
  },
);

export const postCreatePost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const body = req.body as CreatePostBody;
    const authorId = req.user?.userId;

    if (!authorId) {
      res.status(401).json({ message: "User not authenticated" });
      return;
    }

    const createdPost = await db.createPost(body.title, authorId, body.content);

    res.status(201).json({ createdPost });
  },
);

export const putEditPost = asyncHandler(
  async (req: Request<EditPostParams>, res: Response): Promise<void> => {
    const body = req.body as EditPostBody;
    const postId = Number(req.params.postId);

    if (!body.title?.trim() && !body.content?.trim()) {
      res.status(400).json({ message: "At least one field should be filled." });
      return;
    }

    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid Post ID format" });
      return;
    }

    const post = await db.findPost(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post?.authorId !== req.user?.userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const editedPost = await db.updatePost(postId, body.title, body.content);

    res.status(200).json({ editedPost });
  },
);

export const postPublishPost = asyncHandler(
  async (req: Request<PostStatusParams>, res: Response): Promise<void> => {
    const postId = Number(req.params.postId);

    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid Post ID format" });
      return;
    }

    const post = await db.findPost(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post?.authorId !== req.user?.userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const publishedPost = await db.publishPost(postId);

    res.status(200).json({ publishedPost });
  },
);

export const postUnpublishPost = asyncHandler(
  async (req: Request<PostStatusParams>, res: Response): Promise<void> => {
    const postId = Number(req.params.postId);

    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid Post ID format" });
      return;
    }

    const post = await db.findPost(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post?.authorId !== req.user?.userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const unpublishedPost = await db.unpublishPost(postId);

    res.status(200).json({ unpublishedPost });
  },
);

export const deletePost = asyncHandler(
  async (req: Request<DeletePostParams>, res: Response): Promise<void> => {
    const postId = Number(req.params.postId);

    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid Post ID format" });
      return;
    }

    const post = await db.findPost(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post?.authorId !== req.user?.userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const deletedPost = await db.deletePost(postId);

    res.status(200).json({ deletedPost });
  },
);
