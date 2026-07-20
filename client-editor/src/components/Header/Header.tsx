import "./Header.css";
import { Link } from "react-router";

export default function Header() {
  return (
    <header className="header">
      <h1>Blog API - Editor</h1>
      <div className="actions">
        <Link to={"/"}>Home</Link>
        <Link to={"/login"}>Login</Link>
        <Link to={"/signup"}>Signup</Link>
      </div>
    </header>
  );
}
