import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { BookingProvider } from "./contexts/BookingContext";

import Header from "./components/Header";
import Home from "./pages/Home";
import SpaceDetail from "./pages/SpaceDetail";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

function RequireAuth({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/space/:spaceId" element={<SpaceDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/my-bookings" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}
