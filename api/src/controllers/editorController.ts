import type { Request, Response } from "express";
import * as db from "../db/queries.js";

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

export const getAuthorPosts = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const authorId = req.user?.userId;

  if (!authorId) {
    res.status(401).json({ message: "User not authenticated" });
    return;
  }
};

export const postCreatePost = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = req.body as CreatePostBody;
};

export const putEditPost = async (
  req: Request<EditPostParams>,
  res: Response,
): Promise<void> => {
  const body = req.body as EditPostBody;
};

export const postPublishPost = async (
  req: Request<PostStatusParams>,
  res: Response,
): Promise<void> => {
  const postId = Number(req.params.postId);
};

export const postUnpublishPost = async (
  req: Request<PostStatusParams>,
  res: Response,
): Promise<void> => {
  const postId = Number(req.params.postId);
};

export const deletePost = async (
  req: Request<DeletePostParams>,
  res: Response,
): Promise<void> => {
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    res.status(400).json({ message: "Invalid Post ID format" });
    return;
  }
};
