import type { Post } from "../types";
import { authFetch } from "./auth";

type PostsResponse = {
  authorPosts: Post[];
};

export const getUserPosts = async (signal: AbortSignal): Promise<Post[]> => {
  const data: PostsResponse = await authFetch("/api/editor/my-posts", {
    signal,
  });
  console.log(data);
  return data.authorPosts;
};
