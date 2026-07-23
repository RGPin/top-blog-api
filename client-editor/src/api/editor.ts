import type { PostWithAuthor } from "../types";
import { authFetch } from "./auth";

type PostsResponse = {
  authorPosts: PostWithAuthor[];
};

export const getUserPosts = async (
  signal: AbortSignal,
): Promise<PostWithAuthor[]> => {
  const data: PostsResponse = await authFetch("/api/editor/my-posts", {
    signal,
  });
  console.log(data);
  return data.authorPosts;
};
