import { useMutation, useQuery } from "@tanstack/react-query";
import { editUserPost, getUserPosts } from "../api/editor";
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
    onSuccess: (data) => {
      console.log("Edit success");
      return data;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};
