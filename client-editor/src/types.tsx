export type User = {
  name: string | null;
  id: number;
  email: string;
};

export type SignupResponse = {
  user: User;
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

export type PostDetails = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  authorId: number;

  author: {
    id: number;
    name: string | null;
  };

  comments: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;

    author: {
      id: number;
      name: string | null;
    };
  }[];
};

export type PostDetailsResponse = {
  postDetails: PostDetails;
};

export type AddCommentResponse = {
  createdComment: Comment;
};

export type EditCommentResponse = {
  editedComment: Comment;
};

export type DeleteCommentResponse = {
  deletedComment: Comment;
};

export type Comment = {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;

  author: {
    id: number;
    name: string | null;
  };
};

export type AccessToken = string;

export type LoginRefreshResponse = {
  accessToken: AccessToken;
};
