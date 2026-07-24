import { Link } from "react-router";
import { useFetchPost } from "../../hooks/userQueries";
import "./PostList.css";
import {
  useFetchAuthorPosts,
  useTogglePublish,
} from "../../hooks/editorQueries";
import { useState } from "react";

type PostListProps = {
  editorMode: boolean;
};

export default function PostList({ editorMode }: PostListProps) {
  const postsQuery = editorMode ? useFetchAuthorPosts() : useFetchPost();
  const publishMutation = useTogglePublish();

  const posts = postsQuery.data;

  const [isAddPost, setIsAddPost] = useState(false);
  const [titleInput, setTitleInput] = useState("");
  const [contentInput, setContentInput] = useState("");

  const handlePublishPost = (postId: number, isPublished: boolean) => {
    publishMutation.mutate({ postId, isPublished });
  };

  const handleSubmitCreate = (e: React.SubmitEvent) => {
    e.preventDefault();
  };

  const handleCancelCreate = () => {
    setIsAddPost(false);
    setTitleInput("");
    setContentInput("");
  };

  if (postsQuery.isLoading) return <h1>Loading...</h1>;
  if (postsQuery.error) return <h1>{postsQuery.error.message}</h1>;

  return (
    <div className="post-list">
      <div className="add-post">
        {!isAddPost && (
          <button onClick={() => setIsAddPost(true)}>Create Post</button>
        )}
        {isAddPost && (
          <form className="post-form" onSubmit={handleSubmitCreate}>
            <div className="form-field">
              <label htmlFor="post-title">Post Title</label>
              <input
                type="text"
                name="post-title"
                id="post-title"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                required
              ></input>
              <label htmlFor="post-content">Post Content</label>
              <textarea
                name="post-content"
                id="post-content"
                value={contentInput}
                onChange={(e) => setContentInput(e.target.value)}
              ></textarea>
            </div>
            <div className="post-form-actions">
              <button type="button" onClick={handleCancelCreate}>
                Cancel
              </button>
              <button type="submit">Create Post</button>
            </div>
          </form>
        )}
      </div>
      <div className="post-list-grid">
        {posts
          ?.filter((post) => editorMode || post.published)
          .map(({ id, title, author, updatedAt, published }) => (
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
                  <button onClick={() => handlePublishPost(id, published)}>
                    {published ? "Unpublish Post" : "Publish Post"}
                  </button>
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
