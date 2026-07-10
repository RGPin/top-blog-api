import type { Request, Response } from "express";
// Request<Params, ResBody, ReqBody, ReqQuery, Locals>

type GetCommentsParams = {
  postId: string;
};

type CreateCommentBody = {
  postId: string;
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

const getComments = async (
  req: Request<GetCommentsParams>,
  res: Response,
): Promise<void> => {
  const postId = Number(req.params.postId);

  if (isNaN(postId)) {
    res.status(400).json({ message: "Invalid Post ID format" });
    return;
  }
};

const postCreateComment = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const body = req.body as CreateCommentBody;
};

const putEditComment = async (
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

const deleteComment = async (
  req: Request<DeleteCommentParams>,
  res: Response,
): Promise<void> => {
  const commentId = Number(req.params.commentId);

  if (isNaN(commentId)) {
    res.status(400).json({ error: "Invalid Comment ID format" });
    return;
  }
};

export { getComments, postCreateComment, putEditComment, deleteComment };
