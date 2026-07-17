import { useSignUp } from "../../hooks/authQueries";

export default function SignupPage() {
  const signupQuery = useSignUp();
  const testSignup = () => {
    signupQuery.mutate({ email: "first@user.com" });
  };
  return (
    <div className="signup">
      <h1>Signup</h1>
      <button onClick={testSignup}>Test</button>
    </div>
  );
}
