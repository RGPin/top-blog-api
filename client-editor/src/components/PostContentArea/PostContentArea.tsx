import { useLocation } from "react-router";
import type { PostDetails } from "../../types";
import PostContent from "../PostContent/PostContent";
import { useState } from "react";
import { useEditAuthorPost } from "../../hooks/editorQueries";

type PostProps = {
  post: PostDetails;
};
export default function PostContentArea({ post }: PostProps) {
  const { editorMode } = useLocation().state || {};

  const editMutation = useEditAuthorPost(post.id);

  const [isEditing, setIsEditing] = useState(false);
  const [titleInput, setTitleInput] = useState(post.title);
  const [contentInput, setContentInput] = useState(post.content);

  const handleCancel = () => {
    setIsEditing(false);
    setTitleInput(post.title);
    setContentInput(post.content);
  };

  const handleSubmitEdit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const title = titleInput.trim();
    const content = contentInput.trim();
    if (!title && !content) return;

    editMutation.mutateAsync({ postId: post.id, title, content });
    setIsEditing(false);
  };

  return (
    <>
      {editorMode && isEditing && (
        <form className="post-form" onSubmit={handleSubmitEdit}>
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
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit">Save</button>
          </div>
        </form>
      )}
      {!isEditing && <PostContent post={post} />}
      {!isEditing && (
        <div className="actions">
          <button onClick={() => setIsEditing(true)}>Edit Post</button>
          <button>Delete Post</button>
        </div>
      )}
    </>
  );
}
