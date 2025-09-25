import React, { useState } from "react";
import { useBookings } from "../contexts/BookingContext";
import { useAuth } from "../contexts/AuthContext";
import ConfirmationModal from "../components/ConfirmationModal";
import spacesData from "../data/spaces.json";

export default function Dashboard() {
  // Get current logged-in user
  const { user } = useAuth();
  // Booking context methods
  const { bookingsForUser, cancelBooking } = useBookings();

  // State for confirmation modal
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetBooking, setTargetBooking] = useState(null);

  // Fetch bookings specific to the logged-in user
  const bookings = bookingsForUser(user?.id);

  // When user clicks "Cancel" on a booking
  function handleCancelClick(b) {
    setTargetBooking(b);
    setConfirmOpen(true); // open modal
  }

  // When user confirms cancellation in modal
  function handleConfirm() {
    cancelBooking(targetBooking.id); // remove booking
    setConfirmOpen(false); // close modal
    setTargetBooking(null); // reset state
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>My Bookings</h2>

      {/* If no user logged in */}
      {!user && <p>Please login to view bookings.</p>}

      {/* If user logged in but has no bookings */}
      {user && bookings.length === 0 && <p>No bookings yet.</p>}

      {/* If user has bookings */}
      {user && bookings.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {bookings.map((b) => {
            // Find the booked space details from spaces.json
            const space = spacesData.find((s) => s.id === b.spaceId) || {
              name: "Unknown",
            };
            return (
              <li
                key={b.id}
                style={{
                  padding: 12,
                  borderBottom: "1px solid #eee",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {/* Space details */}
                <div>
                  <strong>{space.name}</strong>
                  <div>
                    {b.date} · {b.timeSlot}
                  </div>
                </div>

                {/* Cancel button */}
                <div>
                  <button onClick={() => handleCancelClick(b)}>Cancel</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        message={`Are you sure you want to cancel this booking?`}
      />
    </div>
  );
}
