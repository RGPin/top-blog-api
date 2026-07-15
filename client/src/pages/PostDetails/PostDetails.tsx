import { useParams } from "react-router";
import { useFetchPostDetails } from "../../hooks/queries";
import PostContentArea from "../../components/PostContentArea/PostContentArea";
import CommentsArea from "../../components/CommentsArea/CommentsArea";

export default function PostDetails() {
  const params = useParams();
  const postId = Number(params.postId);
  const postDetailsQuery = useFetchPostDetails(postId);
  const post = postDetailsQuery.data;

  console.log(postDetailsQuery.data);

  if (postDetailsQuery.isLoading) return <h1>Loading...</h1>;
  if (postDetailsQuery.error) return <h1>{postDetailsQuery.error.message}</h1>;
  if (!post) return <h1>Loading post...</h1>;
  return (
    <article className="post-details">
      {/* Post Content Area */}
      <PostContentArea post={post} />

      {/* Comments Area */}
      <CommentsArea post={post} />
    </article>
  );
}
