import type { Post, PostWithAuthor } from "../types";
import { authFetch } from "./auth";

type PostsResponse = {
  authorPosts: PostWithAuthor[];
};

type EditResponse = {
  editedPost: PostWithAuthor;
};

type DeleteResponse = {
  deletedPost: Post;
};

type PublishedResponse = {
  publishedPost: Post;
};

type UnpublishedResponse = {
  unpublishedPost: Post;
};

type CreateResponse = {
  createdPost: Post;
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

export const editUserPost = async (editData: {
  postId: number;
  title?: string;
  content?: string;
}): Promise<PostWithAuthor> => {
  const data: EditResponse = await authFetch(
    `/api/editor/posts/edit/${editData.postId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editData.title,
        content: editData.content,
      }),
    },
  );
  return data.editedPost;
};

export const deleteUserPost = async (deleteData: {
  postId: number;
}): Promise<Post> => {
  const data: DeleteResponse = await authFetch(
    `/api/editor/posts/delete/${deleteData.postId}`,
    {
      method: "DELETE",
    },
  );
  return data.deletedPost;
};

export const togglePublishPost = async (publishData: {
  postId: number;
  isPublished: boolean;
}): Promise<Post> => {
  if (publishData.isPublished) {
    const data: UnpublishedResponse = await authFetch(
      `/api/editor/posts/unpublish/${publishData.postId}`,
      { method: "POST" },
    );
    return data.unpublishedPost;
  }

  const data: PublishedResponse = await authFetch(
    `/api/editor/posts/publish/${publishData.postId}`,
    { method: "POST" },
  );
  return data.publishedPost;
};

export const createPost = async (postData: {
  title: string;
  content: string;
}): Promise<Post> => {
  const data: CreateResponse = await authFetch("/api/editor/posts/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: postData.title, content: postData.content }),
  });
  return data.createdPost;
};
