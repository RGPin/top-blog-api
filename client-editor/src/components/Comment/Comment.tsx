import { useState } from "react";
import { useDeleteComment, useEditComment } from "../../hooks/userQueries";
import { useTokenPayload } from "../../hooks/useTokenPayload";
import type { Comment } from "../../types";

type CommentProps = {
  comment: Comment;
  postId: number;
};

export default function Comment({ comment, postId }: CommentProps) {
  const userId = useTokenPayload()?.userId;

  const [isEditing, setIsEditing] = useState<number | null>();
  const [input, setInput] = useState(comment.content);

  const deleteCommentQuery = useDeleteComment(postId);
  const editCommentQuery = useEditComment(postId);

  const handleDelete = (commentId: number) => {
    deleteCommentQuery.mutate(commentId);
  };

  const handleEdit = (commentId: number) => {
    setIsEditing(commentId);
  };

  const handleSaveEdit = (commentId: number) => {
    const comment = input.trim();
    if (!comment) return;
    editCommentQuery.mutate({ id: commentId, content: comment });
    setIsEditing(null);
    setInput("");
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setInput(comment.content);
  };

  return (
    <li className="comment-item">
      {isEditing === comment.id ? (
        <form>
          <label style={{ display: "none" }} htmlFor="edit-comment">
            Edit Comment
          </label>
          <input
            type="text"
            name="edit-comment"
            id="edit-comment"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="button" onClick={() => handleSaveEdit(comment.id)}>
            Save
          </button>
          <button type="button" onClick={handleCancelEdit}>
            Cancel
          </button>
        </form>
      ) : (
        <blockquote className="comment-body">
          <p className="comment-content">{comment.content}</p>
          <cite className="comment-author">
            — {comment.author.name || "Anonymous"}
          </cite>
        </blockquote>
      )}
      {userId === comment.author.id && (
        <div className="actions">
          <button
            onClick={() => handleDelete(comment.id)}
            disabled={
              deleteCommentQuery.isPending || editCommentQuery.isPending
            }
          >
            Delete
          </button>
          <button
            onClick={() => handleEdit(comment.id)}
            disabled={
              deleteCommentQuery.isPending || editCommentQuery.isPending
            }
          >
            Edit
          </button>
        </div>
      )}
    </li>
  );
}
