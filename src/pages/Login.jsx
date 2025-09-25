import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  // Local state for storing input name
  const [name, setName] = useState("");

  // Get login function from AuthContext
  const { login } = useAuth();

  // React Router navigation hooks
  const nav = useNavigate();
  const loc = useLocation();

  // If redirected to login, store original page to return after login
  const from = loc.state?.from || "/";

  // Handle login form submission
  function handleLogin(e) {
    e.preventDefault();

    // Validation: prevent empty/blank names
    if (!name.trim()) return alert("Enter name");

    // Call AuthContext login function with name
    login(name.trim());

    // Redirect back to previous page or home
    nav(from);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* Name input field */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{ padding: 8 }}
        />

        {/* Submit button */}
        <button style={{ marginLeft: 8 }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
