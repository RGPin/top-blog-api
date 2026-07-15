import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/users";

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
