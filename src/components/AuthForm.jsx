import { useState } from "react";
import { signUp, signIn } from "../auth";
import "../styles/AuthForm.css"; // Import the updated CSS file

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("student"); // Default role
  const [isSignUp, setIsSignUp] = useState(true);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isSignUp) {
        await signUp(email, password, name, role);
        alert("Check your email for confirmation.");
      } else {
        await signIn(email, password);
        alert("Successfully signed in!");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        {isSignUp && (
          <>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="auth-input"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="auth-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="landlord">Landlord</option>
            </select>
          </>
        )}
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="auth-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="auth-input"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="auth-btn">
          {isSignUp ? "Sign Up" : "Sign In"}
        </button>
      </form>
      {error && <p className="auth-error">{error}</p>}
      <button className="toggle-btn" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
      </button>
    </div>
  );
};

export default AuthForm;
