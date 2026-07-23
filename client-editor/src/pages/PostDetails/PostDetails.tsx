import { useLocation, useParams } from "react-router";
import { useFetchPostDetails } from "../../hooks/userQueries";
import PostContentArea from "../../components/PostContentArea/PostContentArea";
import CommentsArea from "../../components/CommentsArea/CommentsArea";

export default function PostDetails() {
  const { editorMode } = useLocation().state || {};
  const params = useParams();
  console.log({ params });
  const postId = Number(params.postId);
  const postDetailsQuery = useFetchPostDetails(postId);
  const post = postDetailsQuery.data;

  console.log({ postId, detail: postDetailsQuery.data, editorMode });

  if (postDetailsQuery.isLoading) return <h1>Loading...</h1>;
  if (postDetailsQuery.error) return <h1>{postDetailsQuery.error.message}</h1>;
  if (!post) return <h1>Loading post...</h1>;
  return (
    <article className="post-details">
      <PostContentArea post={post} />
      <CommentsArea post={post} />
    </article>
  );
}
