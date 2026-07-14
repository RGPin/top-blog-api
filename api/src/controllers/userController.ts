import type { Request, Response } from "express";
import * as db from "../db/queries.js";

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

export const getPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {};

export const getPostDetails = async (
  req: Request<PostDetailParams>,
  res: Response,
): Promise<void> => {
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    res.status(400).json({ message: "Invalid Post ID format" });
    return;
  }
};

export const postCreateComment = async (
  req: Request<CreateCommentParams>,
  res: Response,
): Promise<void> => {
  const body = req.body as CreateCommentBody;
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    res.status(400).json({ message: "Invalid Post ID format" });
    return;
  }
};

export const putEditComment = async (
  req: Request<EditCommentParams>,
  res: Response,
): Promise<void> => {
  const body = req.body as EditCommentBody;
  const commentId = Number(req.params.commentId);

  if (isNaN(commentId)) {
    res.status(400).json({ message: "Invalid Comment ID format" });
    return;
  }
};

export const deleteComment = async (
  req: Request<DeleteCommentParams>,
  res: Response,
): Promise<void> => {
  const commentId = Number(req.params.commentId);

  if (isNaN(commentId)) {
    res.status(400).json({ error: "Invalid Comment ID format" });
    return;
  }
};
