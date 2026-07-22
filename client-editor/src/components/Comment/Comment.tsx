import { useTokenPayload } from "../../hooks/useTokenPayload";
import type { Comment } from "../../types";

type CommentProps = {
  comment: Comment;
};

export default function Comment({ comment }: CommentProps) {
  const userId = useTokenPayload()?.userId;

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
          <button>Delete</button>
          <button>Edit</button>
        </div>
      )}
    </li>
  );
}
