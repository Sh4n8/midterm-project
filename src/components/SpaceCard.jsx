import React from "react";
import { Link } from "react-router-dom";
import '../index.css';

export default function SpaceCard({ space }) {
  // Receives a "space" object as a prop (contains id, name, image, location, price, etc.)
  // Clicking the card redirects to the details page of that specific space
  return (
    <Link to={`/space/${space.id}`} className="space-card-link">
      <div className="space-card">
        <div className="card-image-container">
          {/* If main_image is missing, show placeholder */}
          <img
            src={space.main_image || "/assets/placeholder.jpg"}
            alt={space.name}
            className="card-image"
          />
        </div>
        
        <div className="card-content">
          <div className="card-header">
            <h3 className="space-name">{space.name}</h3>
            <div className="space-rating">
              {/* Static rating star + hardcoded rating */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#FFD700">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              </svg>
              <span>4.8</span>
            </div>
          </div>
          
          <p className="space-location">{space.location}</p>
          
          <div className="card-footer">
            <div className="price-section">
              <span className="price">₱{space.price}</span>
              <span className="price-period">per hour</span>
            </div>
            <div className="availability-badge">
              Available
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
