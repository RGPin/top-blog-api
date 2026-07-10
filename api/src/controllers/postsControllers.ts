import type { Request, Response } from "express";
// Request<Params, ResBody, ReqBody, ReqQuery, Locals>

type PostDetailParams = {
  postId: string;
};

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

type DeletePostParams = {
  postId: string;
};

const getPosts = async (req: Request, res: Response): Promise<void> => {};

const getPostDetails = async (
  req: Request<PostDetailParams>,
  res: Response,
): Promise<void> => {
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    res.status(400).json({ message: "Invalid Post ID format" });
    return;
  }
};

const postCreatePost = async (req: Request, res: Response): Promise<void> => {
  const body = req.body as CreatePostBody;
};

const putEditPost = async (
  req: Request<EditPostParams>,
  res: Response,
): Promise<void> => {
  const body = req.body as EditPostBody;
};

const deletePost = async (
  req: Request<DeletePostParams>,
  res: Response,
): Promise<void> => {
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    res.status(400).json({ message: "Invalid Post ID format" });
    return;
  }
};

export { getPosts, getPostDetails, postCreatePost, putEditPost, deletePost };
