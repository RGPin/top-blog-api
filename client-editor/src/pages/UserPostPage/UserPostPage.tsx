import PostList from "../../components/PostList/PostList";

export default function UserPostPage() {
  return (
    <div>
      <h1>User Posts</h1>
      <PostList editorMode={true} />
    </div>
  );
}
