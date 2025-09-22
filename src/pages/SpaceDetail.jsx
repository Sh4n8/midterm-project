import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import spacesData from "../data/spaces.json";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";
import "../index.css";

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const space = spacesData.find((s) => String(s.id) === spaceId);
  const { user } = useAuth();
  const { addBooking } = useBookings();
  const nav = useNavigate();

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState(space?.time_slots?.[0] || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  if (!space) return <div className="not-found">Space not found.</div>;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!user) {
      return nav("/login", { state: { from: `/space/${spaceId}` } });
    }
    if (!date || !timeSlot) {
      setError("Please choose date and time slot.");
      return;
    }
    try {
      const booking = addBooking({ spaceId: space.id, date, timeSlot });
      setSuccess(booking);
    } catch (err) {
      setError(err.message || "Failed to book");
    }
  }

  return (
    <div className="space-detail-container">
      <div className="space-header">
        <h1 className="space-title">{space.name}</h1>
      </div>

      <div className="image-gallery">
        <div className="main-image">
          <img
            src={space.main_image || "/assets/placeholder.jpg"}
            alt={space.name}
            className="gallery-img main"
          />
        </div>
        <div className="image-grid">
          <img
            src={space.main_image || "/assets/placeholder.jpg"}
            alt={space.name}
            className="gallery-img grid"
          />
          <img
            src={space.main_image || "/assets/placeholder.jpg"}
            alt={space.name}
            className="gallery-img grid"
          />
          <img
            src={space.main_image || "/assets/placeholder.jpg"}
            alt={space.name}
            className="gallery-img grid"
          />
          <div className="gallery-img grid show-all">
            <img
              src={space.main_image || "/assets/placeholder.jpg"}
              alt={space.name}
              className="gallery-img grid"
            />
          </div>
        </div>
      </div>

      <div className="content-layout">
        <div className="main-content">
          <div className="space-info">
            <div className="space-meta">
              <h2>
                {space.name} in {space.location}
              </h2>
            </div>

            <div className="description-section">
              <h3>Description</h3>
              <p className="space-description">{space.description}</p>
            </div>

            <div className="amenities-section">
              <h3>What this place offers</h3>
              <div className="amenities-grid">
                {space.amenities.map((amenity) => (
                  <div key={amenity} className="amenity-item">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="booking-sidebar">
          <div className="booking-card">
            <div className="booking-header">
              <div className="price-section">
                <span className="price">₱{space.price}</span>
                <span className="price-period">per hour</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="booking-form">
              <div className="date-inputs">
                <div className="input-group">
                  <label className="input-label">CHECK-IN</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="date-input"
                    placeholder="03/10/2025"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">CHECKOUT</label>
                  <input
                    type="date"
                    className="date-input"
                    placeholder="05/10/2025"
                  />
                </div>
              </div>

              <div className="guest-dropdown">
                <label className="input-label">TIME SLOT</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="guest-select"
                >
                  {space.time_slots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              {error && <div className="error-message">{error}</div>}

              <button type="submit" className="reserve-btn">
                Book Now
              </button>
            </form>

            {success && (
              <div className="success-message">
                Booking confirmed! Check{" "}
                <a href="/dashboard/my-bookings">My Bookings</a>.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
