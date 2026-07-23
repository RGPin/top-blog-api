import { Link } from "react-router";
import { useFetchPost } from "../../hooks/userQueries";
import "./PostList.css";
import { useFetchAuthorPosts } from "../../hooks/editorQueries";

type PostListProps = {
  editorMode: boolean;
};

export default function PostList({ editorMode }: PostListProps) {
  const postsQuery = editorMode ? useFetchAuthorPosts() : useFetchPost();

  console.log(postsQuery.data);
  const posts = postsQuery.data;

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.error) return <h1>{postsQuery.error.message}</h1>;

  return (
    <div className="post-list">
      <div className="post-list-grid">
        {posts?.map(({ id, title, author, updatedAt, published }) => (
          <article className="post-item" key={id}>
            <header className="post-header">
              <h2 className="post-title">
                <Link
                  to={editorMode ? `/my-posts/details/${id}` : `/post/${id}`}
                  className="post-link"
                  state={editorMode ? { editorMode } : undefined}
                >
                  {title}
                </Link>
              </h2>
            </header>

            <footer className="post-meta">
              <span className="post-author">By {author.name}</span>
              {editorMode && (
                <span className="post-ispublished">
                  Published: {published ? "Yes" : "No"}
                </span>
              )}
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
