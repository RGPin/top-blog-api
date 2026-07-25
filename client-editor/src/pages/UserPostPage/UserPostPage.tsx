import "./UserPostPage.css";
import PostList from "../../components/PostList/PostList";

export default function UserPostPage() {
  return (
    <div className="user-posts-page">
      <h1>Create, Edit, and Delete Posts</h1>
      <PostList editorMode={true} />
    </div>
  );
}
