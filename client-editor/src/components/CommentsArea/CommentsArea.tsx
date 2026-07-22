import { useState } from "react";
import type { PostDetails } from "../../types";
import Comment from "../Comment/Comment";
import { useAddComment } from "../../hooks/userQueries";

type PostProps = {
  post: PostDetails;
};
export default function CommentsArea({ post }: PostProps) {
  const [input, setInput] = useState("");

  const addCommentQuery = useAddComment(post.id);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const comment = input.trim();
    if (!comment) return;
    addCommentQuery.mutate({ postId: post.id, content: input });
    setInput("");
  };

  return (
    <>
      {post.comments && post.comments.length > 0 ? (
        <section className="comments-section" aria-label="Post comments">
          <h3 className="comments-heading">
            Comments ({post.comments.length})
          </h3>
          <ul className="comments-list">
            {post.comments.map((comment) => (
              <Comment key={comment.id} comment={comment} postId={post.id} />
            ))}
          </ul>
        </section>
      ) : (
        <section
          className="comments-section empty-comments"
          aria-label="Post comments"
        >
          <h3 className="comments-heading">Comments (0)</h3>
          <p className="no-comments-message">
            No comments yet. Be the first to share your thoughts!
          </p>
        </section>
      )}
      <form onSubmit={handleSubmit}>
        <label style={{ display: "none" }} htmlFor="comment">
          Add Comment
        </label>
        <input
          type="text"
          id="comment"
          name="comment"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={addCommentQuery.isPending}
        />
        <button type="submit" disabled={addCommentQuery.isPending}>
          {addCommentQuery.isPending ? "Loading" : "Add Comment"}
        </button>
      </form>
    </>
  );
}
