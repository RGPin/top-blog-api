import { prisma } from "./prismaInstance.js";
import { Prisma } from "./generated/prisma/client";
import type { User, Post, Comment } from "./generated/prisma/client.js";

type CommentWithAuthor = Comment & {
  author: Pick<User, "id" | "name">;
};

export const createUser = async (
  email: string,
  name?: string,
): Promise<User> => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: name ?? "AnonymousUser",
        email,
      },
    });
    return newUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error(`A user with the email ${email} already exists.`);
      }
    }
    console.error("createUser failed: ", { error });
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<User> => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return deletedUser;
  } catch (error) {
    console.error("deleteUser failed: ", { error });
    throw error;
  }
};

export const updateUser = async (
  userId: number,
  name: string,
): Promise<User> => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
      },
    });
    return updatedUser;
  } catch (error) {
    console.error("updateUser failed: ", { error });
    throw error;
  }
};

export const findUser = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch (error) {
    console.error("findUser failed: ", { error });
    throw error;
  }
};

export const createPost = async (
  title: string,
  authorId: number,
  content?: string,
): Promise<Post> => {
  try {
    const newPost = await prisma.post.create({
      data: {
        content: content ?? null,
        title,
        authorId,
      },
    });
    return newPost;
  } catch (error) {
    console.error("createPost failed: ", { error });
    throw error;
  }
};

export const publishPost = async (postId: number): Promise<Post> => {
  try {
    const publishedPost = await prisma.post.update({
      where: { id: postId },
      data: { published: true },
    });
    return publishedPost;
  } catch (error) {
    console.error("publishPost failed: ", { error });
    throw error;
  }
};

export const updatePost = async (
  postId: number,
  title?: string,
  content?: string,
): Promise<Post> => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...(title !== undefined && { title }),
        ...(content !== undefined && { content }),
      },
    });
    return updatedPost;
  } catch (error) {
    console.error("updatePost failed: ", { error });
    throw error;
  }
};

export const retrieveAuthorPosts = async (
  authorId: number,
  publishedFilter: boolean,
): Promise<Post[]> => {
  try {
    const authorPosts = await prisma.post.findMany({
      where: {
        authorId,
        ...(publishedFilter !== undefined && { published: publishedFilter }),
      },
    });
    return authorPosts;
  } catch (error) {
    console.error("retrieveAuthorPosts failed: ", { error });
    throw error;
  }
};

export const retrievePostWithComments = async (postId: number) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          select: { id: true, name: true },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            author: {
              select: { id: true, name: true },
            },
          },
        },
      },
    });
    return post;
  } catch (error) {
    console.error("retrievePostWithComments failed: ", { error });
    throw error;
  }
};

export const retrievePublishedPosts = async (): Promise<Post[]> => {
  try {
    const publishedPosts = await prisma.post.findMany({
      where: { published: true },
      orderBy: {
        createdAt: "desc",
      },
    });
    return publishedPosts;
  } catch (error) {
    console.error("retrievePublishedPosts failed: ", { error });
    throw error;
  }
};

export const unpublishPost = async (postId: number): Promise<Post> => {
  try {
    const unpublishedPost = await prisma.post.update({
      where: { id: postId },
      data: { published: false },
    });
    return unpublishedPost;
  } catch (error) {
    console.error("unpublishPost failed: ", { error });
    throw error;
  }
};

export const deletePost = async (postId: number): Promise<Post> => {
  try {
    const deletedPost = await prisma.post.delete({
      where: { id: postId },
    });
    return deletedPost;
  } catch (error) {
    console.error("deletePost failed: ", { error });
    throw error;
  }
};

export const retrieveComments = async (
  postId: number,
): Promise<CommentWithAuthor[]> => {
  try {
    const postComments = await prisma.comment.findMany({
      where: { postId },
      include: {
        author: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "asc" },
    });
    return postComments;
  } catch (error) {
    console.error("retrieveComments failed: ", { error });
    throw error;
  }
};

export const createComment = async (
  authorId: number,
  postId: number,
  content: string,
): Promise<Comment> => {
  try {
    const createdComment = await prisma.comment.create({
      data: { authorId, postId, content },
    });
    return createdComment;
  } catch (error) {
    console.error("createComment failed: ", { error });
    throw error;
  }
};

export const deleteComment = async (commentId: number): Promise<Comment> => {
  try {
    const deletedComment = await prisma.comment.delete({
      where: { id: commentId },
    });
    return deletedComment;
  } catch (error) {
    console.error("deleteComment failed: ", { error });
    throw error;
  }
};

export const updateComment = async (
  commentId: number,
  content: string,
): Promise<Comment> => {
  try {
    const updatedComment = await prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
    return updatedComment;
  } catch (error) {
    console.error("updateComment failed: ", { error });
    throw error;
  }
};

// function main() {
//   console.log("testing");
//   createPost("This is content", "Title", 1);
//   console.log("done");
// }

// main();
