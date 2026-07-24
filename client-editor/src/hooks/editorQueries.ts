import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteUserPost, editUserPost, getUserPosts } from "../api/editor";
import { queryClient } from "../queryClient";

export const useFetchAuthorPosts = () => {
  return useQuery({
    queryKey: ["user-posts"],
    queryFn: ({ signal }) => getUserPosts(signal),
    placeholderData: [],
    meta: {
      errorMessage: "useFetchAuthorPosts failed",
    },
  });
};

export const useEditAuthorPost = (postId: number) => {
  return useMutation({
    mutationFn: editUserPost,
    onSuccess: () => {
      console.log("Edit success");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};

export const useDeleteAuthorPost = (postId: number) => {
  return useMutation({
    mutationFn: deleteUserPost,
    onSuccess: () => {
      console.log("Delete Success");
    },
    onSettled: () => {
      queryClient.removeQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });
};
