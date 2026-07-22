import { useDeleteComment } from "../../hooks/userQueries";
import { useTokenPayload } from "../../hooks/useTokenPayload";
import type { Comment } from "../../types";

type CommentProps = {
  comment: Comment;
  postId: number;
};

export default function Comment({ comment, postId }: CommentProps) {
  const userId = useTokenPayload()?.userId;

  const deleteCommentQuery = useDeleteComment(postId);

  const handleDelete = (commentId: number) => {
    deleteCommentQuery.mutate(commentId);
  };

  return (
    <li className="comment-item">
      <blockquote className="comment-body">
        <p className="comment-content">{comment.content}</p>
        <cite className="comment-author">
          — {comment.author.name || "Anonymous"}
        </cite>
      </blockquote>
      {userId === comment.author.id && (
        <div className="actions">
          <button onClick={() => handleDelete(comment.id)}>Delete</button>
          <button>Edit</button>
        </div>
      )}
    </li>
  );
}
