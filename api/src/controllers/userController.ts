import type { Request, Response } from "express";
import * as db from "../db/queries.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// create middleware to prevent repeated codes (see if checks)

type PostDetailParams = {
  postId: string;
};

type CreateCommentParams = {
  postId: string;
};

type CreateCommentBody = {
  content: string;
};

type EditCommentParams = {
  commentId: string;
};

type EditCommentBody = {
  content: string;
};

type DeleteCommentParams = {
  commentId: string;
};

export const getPosts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const posts = await db.retrievePublishedPosts();
    res.status(200).json({ posts });
  },
);

export const getPostDetails = asyncHandler(
  async (req: Request<PostDetailParams>, res: Response): Promise<void> => {
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

    if (post?.authorId !== req.user?.userId && !post?.published) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const postDetails = await db.retrievePostWithComments(postId);
    res.status(200).json({ postDetails });
  },
);

export const postCreateComment = asyncHandler(
  async (req: Request<CreateCommentParams>, res: Response): Promise<void> => {
    const body = req.body as CreateCommentBody;
    const postId = Number(req.params.postId);
    const authorId = req.user?.userId;

    if (isNaN(postId)) {
      res.status(400).json({ message: "Invalid Post ID format" });
      return;
    }

    if (!authorId) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const post = await db.findPost(postId);

    if (!post) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    if (post?.authorId !== req.user?.userId && !post?.published) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const createdComment = await db.createComment(
      authorId,
      postId,
      body.content,
    );

    res.status(201).json({ createdComment });
  },
);

export const putEditComment = asyncHandler(
  async (req: Request<EditCommentParams>, res: Response): Promise<void> => {
    const body = req.body as EditCommentBody;
    const commentId = Number(req.params.commentId);

    if (isNaN(commentId)) {
      res.status(400).json({ message: "Invalid Comment ID format" });
      return;
    }

    const comment = await db.findComment(commentId);

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    if (comment?.authorId !== req.user?.userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const editedComment = await db.updateComment(commentId, body.content);

    res.status(200).json({ editedComment });
  },
);

export const deleteComment = asyncHandler(
  async (req: Request<DeleteCommentParams>, res: Response): Promise<void> => {
    const commentId = Number(req.params.commentId);

    if (isNaN(commentId)) {
      res.status(400).json({ message: "Invalid Comment ID format" });
      return;
    }

    const comment = await db.findComment(commentId);

    if (!comment) {
      res.status(404).json({ message: "Comment not found" });
      return;
    }

    if (comment?.authorId !== req.user?.userId) {
      res.status(403).json({ message: "Forbidden" });
      return;
    }

    const deletedComment = await db.deleteComment(commentId);

    res.status(200).json({ deletedComment });
  },
);
