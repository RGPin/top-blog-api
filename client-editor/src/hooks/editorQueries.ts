import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../api/editor";

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
