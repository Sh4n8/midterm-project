// Core React + Router imports
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context providers (global state for auth + bookings)
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";

// Page + component imports
import Header from "./components/Header";
import Home from "./pages/Home";
import SpaceDetail from "./pages/SpaceDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Auth guard for protected routes
function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

// Main app component
export default function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          {/* Persistent header across all pages */}
          <Header />

          {/* App routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/space/:spaceId" element={<SpaceDetail />} />
            <Route path="/login" element={<Login />} />

            {/* Protected route */}
            <Route
              path="/dashboard/my-bookings"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            {/* Catch-all for unknown routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}
