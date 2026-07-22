import type {
  PostDetails,
  PostWithAuthor,
  PostsResponse,
  PostDetailsResponse,
  Comment,
  AddCommentResponse,
  EditCommentResponse,
  DeleteCommentResponse,
} from "../types";
import { authFetch } from "./auth";

export const getPosts = async (
  signal: AbortSignal,
): Promise<PostWithAuthor[]> => {
  const response = await fetch("/api/user/posts", { signal });
  if (!response.ok) throw new Error(response.statusText);
  const data: PostsResponse = await response.json();
  return data.posts;
};

export const getPostDetails = async (postId: number): Promise<PostDetails> => {
  const response = await fetch(`/api/user/posts/${postId}`);
  if (!response.ok) throw new Error(response.statusText);
  const data: PostDetailsResponse = await response.json();
  return data.postDetails;
};

export const addComment = async (commentData: {
  postId: number;
  content: string;
}): Promise<Comment> => {
  const data: AddCommentResponse = await authFetch(
    `/api/user/comments/add/${commentData.postId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: commentData.content }),
    },
  );
  return data.createdComment;
};

export const editComment = async (commentData: {
  id: number;
  content: string;
}): Promise<Comment> => {
  const data: EditCommentResponse = await authFetch(
    `/api/user/comments/edit/${commentData.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: commentData.content }),
    },
  );
  return data.editedComment;
};

export const deleteComment = async (commentId: number): Promise<Comment> => {
  const data: DeleteCommentResponse = await authFetch(
    `/api/user/comments/delete/${commentId}`,
    {
      method: "DELETE",
    },
  );
  return data.deletedComment;
};
