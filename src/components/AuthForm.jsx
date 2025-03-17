import { useState } from "react";
import { signUp, signIn, signOut } from "../auth";
import "../styles/AuthForm.css"; // ✅ Import CSS correctly

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setMessage(""); // Clear previous messages
    try {
      await signUp(email, password, role);
      setMessage("Signup successful! Check your email to confirm.");
    } catch (error) {
      setMessage(error.message || "Signup failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    setMessage("");
    try {
      await signIn(email, password);
      setMessage("Login successful");
    } catch (error) {
      setMessage(error.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Authentication</h1>

      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
      />

      <select value={role} onChange={(e) => setRole(e.target.value)} className="auth-select">
        <option value="student">Student</option>
        <option value="landlord">Landlord</option>
      </select>

      <button onClick={handleSignUp} className="auth-btn signup-btn">
        Signup
      </button>

      <button onClick={handleLogin} className="auth-btn login-btn">
        Login
      </button>

      <button
        onClick={async () => {
          await signOut();
          setMessage("Signed out");
        }}
        className="auth-btn signout-btn"
      >
        Signout
      </button>

      <p className="message">{message}</p>
    </div>
  );
}
