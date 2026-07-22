import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addComment,
  deleteComment,
  editComment,
  getPostDetails,
  getPosts,
} from "../api/users";
import { queryClient } from "../queryClient";

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

export const useAddComment = (postId: number) => {
  return useMutation({
    mutationFn: addComment,
    onSuccess: (data) => {
      console.log("Comment added: ", data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};

export const useEditComment = (postId: number) => {
  return useMutation({
    mutationFn: editComment,
    onSuccess: (data) => {
      console.log("Comment edited: ", data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};

export const useDeleteComment = (postId: number) => {
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (data) => {
      console.log("Comment deleted: ", data);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};
