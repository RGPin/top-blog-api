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
        {posts?.map(({ id, title, author, updatedAt }) => (
          <article className="post-item" key={id}>
            <header className="post-header">
              <h2 className="post-title">
                <Link to={`/post/${id}`} className="post-link">
                  {title}
                </Link>
              </h2>
            </header>

            <footer className="post-meta">
              <span className="post-author">By {author.name}</span>
              <time dateTime={new Date(updatedAt).toISOString()}>
                {new Date(updatedAt).toLocaleDateString()}
              </time>
            </footer>
          </article>
        ))}
      </div>
    </div>
  );
}
