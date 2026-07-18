import "./LoginPage.css";
import { useState } from "react";
import { useLogin } from "../../hooks/authQueries";
import { Link } from "react-router";

export default function LoginPage() {
  const [emailInput, setEmailInput] = useState("");

  const loginQuery = useLogin();

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const email = emailInput.trim();
    if (!email) return;

    loginQuery.mutate(email);
    setEmailInput("");
    // on login, redirect to editor client
  };

  // toast for error

  return (
    <div className="login">
      <div className="login-container">
        <h2 className="login-title">Sign in to your account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Email"
              disabled={loginQuery.isPending}
            />
          </div>
          <button type="submit" disabled={loginQuery.isPending}>
            {loginQuery.isPending ? "Loading" : "Sign In"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
