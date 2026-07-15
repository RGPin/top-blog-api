import type {
  PostDetails,
  PostWithAuthor,
  PostsResponse,
  PostDetailsResponse,
} from "../types";

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
