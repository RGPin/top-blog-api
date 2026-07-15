export type User = {
  name: string | null;
  id: number;
  email: string;
};

export type Post = {
  id: number;
  authorId: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostWithAuthor = {
  id: number;
  authorId: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: Pick<User, "name">;
};

export type PostsResponse = {
  posts: PostWithAuthor[];
};
