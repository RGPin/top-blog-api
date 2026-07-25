import "./MainPage.css";
import PostList from "../../components/PostList/PostList";

export default function MainPage() {
  return (
    <div className="main-page">
      <h1>Browse The Latest Posts</h1>
      <PostList />
    </div>
  );
}
