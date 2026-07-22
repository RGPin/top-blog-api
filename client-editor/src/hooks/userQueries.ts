import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  editComment,
  getPostDetails,
  getPosts,
} from "../api/users";

export const useFetchPost = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: ({ signal }) => getPosts(signal),
    placeholderData: [],
    meta: {
      errorMessage: "useFetchPost failed",
    },
  });
};

export const useFetchPostDetails = (postId: number) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostDetails(postId),
    enabled: !!postId,
    meta: {
      errorMessage: "useFetchPostDetails failed",
    },
  });
};

export const useAddComment = () => {
  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      console.log("Comment added: ", data);
    },
  });
};

export const useEditComment = () => {
  return useMutation({
    mutationFn: editComment,
    onSuccess: (data) => {
      console.log("Comment edited: ", data);
    },
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      console.log("Comment deleted: ", data);
    },
  });
};
