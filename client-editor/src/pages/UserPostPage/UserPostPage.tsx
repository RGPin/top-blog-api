import { useFetchAuthorPosts } from "../../hooks/editorQueries";

export default function UserPostPage() {
  const userPostsQuery = useFetchAuthorPosts();

  const posts = userPostsQuery.data;
  console.log(posts);
  return (
    <div>
      <h1>User Posts</h1>
    </div>
  );
}
