import "./Header.css";
import { Link } from "react-router";

export default function Header() {
  const editorUrl =
    import.meta.env.VITE_EDITOR_URL || "http://localhost:3000/login";
  return (
    <header className="header">
      <h1>Blog API</h1>
      <div className="actions">
        <Link to={"/"}>Home</Link>
        <a href={editorUrl} target="_blank" rel="noopener noreferrer">
          Create
        </a>
      </div>
    </header>
  );
}
