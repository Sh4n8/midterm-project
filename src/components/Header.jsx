import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav("/");
  }

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 16,
        alignItems: "center",
        borderBottom: "1px solid #eee",
      }}
    >
      <div>
        <Link to="/">StudySpot PH</Link>
      </div>
      <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/dashboard/my-bookings">My Bookings</Link>
        {user ? (
          <>
            <span>Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}
      </nav>
    </header>
  );
}
