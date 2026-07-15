import type { Post, PostsResponse } from "../types";

export const getPosts = async (signal: AbortSignal): Promise<Post[]> => {
  const response = await fetch("/api/user/posts", { signal });
  if (!response.ok) throw new Error(response.statusText);
  const data: PostsResponse = await response.json();
  return data.posts;
};
