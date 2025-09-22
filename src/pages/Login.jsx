import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = loc.state?.from || "/";

  function handleLogin(e) {
    e.preventDefault();
    if (!name.trim()) return alert("Enter name");
    login(name.trim());
    nav(from);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Login (Simulated)</h2>
      <form onSubmit={handleLogin}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          style={{ padding: 8 }}
        />
        <button style={{ marginLeft: 8 }} type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
