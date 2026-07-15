export type Post = {
  id: number;
  authorId: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export type PostsResponse = {
  posts: Post[];
};
