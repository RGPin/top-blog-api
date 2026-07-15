import { useParams } from "react-router";
import { useFetchPostDetails } from "../../hooks/queries";

export default function PostDetails() {
  const params = useParams();
  const postId = Number(params.postId);
  const postDetailsQuery = useFetchPostDetails(postId);

  console.log(postDetailsQuery.data);

  if (postDetailsQuery.isLoading) return <h1>Loading...</h1>;
  if (postDetailsQuery.error) return <h1>{postDetailsQuery.error.message}</h1>;
  return <h1>Post details</h1>;
}
