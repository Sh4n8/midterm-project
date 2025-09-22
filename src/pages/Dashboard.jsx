import React, { useState } from "react";
import { useBookings } from "../contexts/BookingContext";
import { useAuth } from "../contexts/AuthContext";
import ConfirmationModal from "../components/ConfirmationModal";
import spacesData from "../data/spaces.json";

export default function Dashboard() {
  const { user } = useAuth();
  const { bookingsForUser, cancelBooking } = useBookings();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [targetBooking, setTargetBooking] = useState(null);

  const bookings = bookingsForUser(user?.id);

  function handleCancelClick(b) {
    setTargetBooking(b);
    setConfirmOpen(true);
  }

  function handleConfirm() {
    cancelBooking(targetBooking.id);
    setConfirmOpen(false);
    setTargetBooking(null);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>My Bookings</h2>
      {!user && <p>Please login to view bookings.</p>}
      {user && bookings.length === 0 && <p>No bookings yet.</p>}
      {user && bookings.length > 0 && (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {bookings.map((b) => {
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
                <div>
                  <strong>{space.name}</strong>
                  <div>
                    {b.date} · {b.timeSlot}
                  </div>
                </div>
                <div>
                  <button onClick={() => handleCancelClick(b)}>Cancel</button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <ConfirmationModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        message={`Are you sure you want to cancel this booking?`}
      />
    </div>
  );
}
