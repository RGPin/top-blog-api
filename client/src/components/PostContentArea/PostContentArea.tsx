import "./PostContentArea.css";
import type { PostDetails } from "../../types";
import PostContent from "../PostContent/PostContent";

type PostProps = {
  post: PostDetails;
};
export default function PostContentArea({ post }: PostProps) {
  return (
    <div className="post-content-area">
      <PostContent post={post} />
    </div>
  );
}
