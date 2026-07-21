import { useLogout } from "../../hooks/authQueries";
import { useAuthStore } from "../../store/useAuthStore";
import "./Header.css";
import { Link, useNavigate } from "react-router";

export default function Header() {
  const { accessToken } = useAuthStore();
  const isAuthenticated = accessToken !== null;

  const navigate = useNavigate();

  const logoutQuery = useLogout();

  const handleLogout = () => {
    logoutQuery.mutate();
  };

  return (
    <header className="header">
      <h1>Blog API - Editor</h1>
      {isAuthenticated ? (
        <div className="actions">
          <Link to={"/"}>Home</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="actions">
          <Link to={"/login"}>Login</Link>
          <Link to={"/signup"}>Signup</Link>
        </div>
      )}
    </header>
  );
}
