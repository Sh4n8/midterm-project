import React, { useState, useEffect } from "react";
import SpaceCard from "../components/SpaceCard";
import spacesData from "../data/spaces.json";
import '../index.css';

export default function Home() {
  // Search query input
  const [query, setQuery] = useState("");
  
  // All spaces data (loaded from JSON)
  const [spaces, setSpaces] = useState([]);

  // Load spaces data on first render
  useEffect(() => {
    setSpaces(spacesData);
  }, []);

  // Filter spaces based on search query (name or location)
  const filtered = spaces.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="home-container">
      {/* ---------- Hero Section with Search ---------- */}
      <section className="hero-section">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Find Your Perfect Study Spot</h1>
            <p className="hero-subtitle">
              Discover amazing study spaces and coworking areas in your city
            </p>

            {/* Search bar */}
            <div className="search-container">
              <div className="search-box">
                <svg
                  className="search-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name or location"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="search-input"
                />
                <button className="search-button">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Available Spaces Section ---------- */}
      <section className="spaces-section">
        <div className="section-header">
          <h2 className="section-title">Available Spaces</h2>
          <p className="section-subtitle">{filtered.length} spaces available</p>
        </div>

        <div className="spaces-grid">
          {/* Render space cards */}
          {filtered.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}

          {/* Show message if no results */}
          {filtered.length === 0 && (
            <div className="no-results">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <h3>No spaces found</h3>
              <p>
                Try adjusting your search terms or browse all available spaces.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
