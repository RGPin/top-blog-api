import "./PostContent.css";
import type { PostDetails } from "../../types";

type PostProps = {
  post: PostDetails;
};

export default function PostContent({ post }: PostProps) {
  return (
    <section className="post-main" aria-labelledby="post-title">
      <header className="post-header">
        <h2 id="post-title" className="post-title">
          {post.title}
        </h2>
        <div className="post-meta">
          <address className="post-author">
            By {post.author.name || "Anonymous"}
          </address>
          {post.updatedAt && (
            <time
              className="post-date"
              dateTime={new Date(post.updatedAt).toISOString()}
            >
              {new Date(post.updatedAt).toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
      </header>

      <div className="post-body">
        <p>{post.content}</p>
      </div>
    </section>
  );
}
