import { useFetchPost } from "../../hooks/queries";

export default function PostList() {
  const postsQuery = useFetchPost();

  console.log(postsQuery.data);
  const posts = postsQuery.data;

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.error) return <h1>{postsQuery.error.message}</h1>;

  return (
    <div className="post-list">
      <ul>
        {posts && posts.map((item) => <li key={item.id}>{item.title}</li>)}
      </ul>
    </div>
  );
}
