// contexts/BookingContext.js
import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  // Keep all bookings in localStorage so data stays even after refresh
  const [allBookings, setAllBookings] = useLocalStorage("ssp_bookings", []);
  const { user } = useAuth();

  // ----------------- Booking Management (Global) -----------------

  // Add a new booking
  function addBooking({ spaceId, date, timeSlot }) {
    if (!user) throw new Error("Must be logged in");

    const newBooking = {
      id: Date.now(), // unique ID generated from current time
      userId: user.id, // connect booking to the current user
      spaceId,
      date,
      timeSlot,
      createdAt: new Date().toISOString(), // save timestamp of booking
    };

    // Save new booking in state + localStorage
    setAllBookings((prev) => [newBooking, ...prev]);

    return newBooking; // return the new booking object
  }

  // Cancel (remove) a booking by its ID
  function cancelBooking(bookingId) {
    setAllBookings((prev) => prev.filter((b) => b.id !== bookingId));
  }

  // ----------------- User-specific Bookings -----------------

  // Get all bookings that belong to a specific user
  function bookingsForUser(userId) {
    if (!userId) return [];
    return allBookings.filter((b) => b.userId === userId);
  }

  return (
    <BookingContext.Provider
      value={{
        allBookings,      // all bookings (global)
        addBooking,       // create booking
        cancelBooking,    // remove booking
        bookingsForUser,  // get bookings for a specific user
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

// Hook for consuming booking context anywhere in the app
export function useBookings() {
  return useContext(BookingContext);
}
