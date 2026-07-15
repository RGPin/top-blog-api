import { Link } from "react-router";
import { useFetchPost } from "../../hooks/queries";
import "./PostList.css";

export default function PostList() {
  const postsQuery = useFetchPost();

  console.log(postsQuery.data);
  const posts = postsQuery.data;

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.error) return <h1>{postsQuery.error.message}</h1>;

  return (
    <div className="post-list">
      <div className="post-list-grid">
        {posts &&
          posts.map((item) => (
            <article className="post-item" key={item.id}>
              <Link to={`/post/${item.id}`} className="post-link">
                <h2 className="post-title">{item.title}</h2>
              </Link>
              <div className="post-meta">
                <p>{item.author.name}</p>
                <time dateTime={new Date(item.updatedAt).toISOString()}>
                  {new Date(item.updatedAt).toLocaleDateString()}
                </time>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}
