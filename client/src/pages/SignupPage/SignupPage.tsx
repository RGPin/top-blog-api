import "./SignupPage.css";
import { useState } from "react";
import { useSignUp } from "../../hooks/authQueries";
import { Link, useNavigate } from "react-router";

export default function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
  });

  const signupQuery = useSignUp();

  const handleFormInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const email = formData.email.trim();
    if (!email) return;

    signupQuery.mutate({ ...formData });
    setFormData((prev) => ({
      ...prev,
      email: "",
      name: "",
    }));
    navigate("/login");
  };

  // toast for error

  return (
    <div className="signup">
      <div className="signup-container">
        <h2 className="signup-title">Create an account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormInput}
              placeholder="Email"
            />
          </div>

          <div className="form-field">
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleFormInput}
              placeholder="Name"
            />
          </div>
          <button type="submit">
            {signupQuery.isPending ? "Loading" : "Sign Up"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
