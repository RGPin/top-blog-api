import { useQuery } from "@tanstack/react-query";
import { getPostDetails, getPosts } from "../api/users";

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
