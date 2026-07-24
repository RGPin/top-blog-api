import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPost,
  deleteUserPost,
  editUserPost,
  getAuthorPostDetails,
  getUserPosts,
  togglePublishPost,
} from "../api/editor";
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

export const useFetchAuthorPostDetails = (postId: number) => {
  return useQuery({
    queryKey: ["user-post", postId],
    queryFn: ({ signal }) => getAuthorPostDetails(postId, signal),
    enabled: !!postId,
    meta: {
      errorMessage: "useFetchAuthorPostDetails failed",
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

export const useTogglePublish = () => {
  return useMutation({
    mutationFn: togglePublishPost,
    onSuccess: () => {
      console.log("Toggle publish success");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });
};

export const useCreatePost = () => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.log("Post create success");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["user-posts"] });
    },
  });
};
