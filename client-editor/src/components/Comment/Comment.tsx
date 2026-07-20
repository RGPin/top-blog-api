import type { Comment } from "../../types";

type CommentProps = {
  comment: Comment;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <li className="comment-item">
      <blockquote className="comment-body">
        <p className="comment-content">{comment.content}</p>
        <cite className="comment-author">
          — {comment.author.name || "Anonymous"}
        </cite>
      </blockquote>
    </li>
  );
}
