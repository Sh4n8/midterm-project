import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useAuth } from "./AuthContext";

const BookingContext = createContext();

export function BookingProvider({ children }) {
  
  const [allBookings, setAllBookings] = useLocalStorage("ssp_bookings", []);
  const { user } = useAuth();

  function addBooking({ spaceId, date, timeSlot }) {
    if (!user) throw new Error("Must be logged in");
    const newBooking = {
      id: Date.now(),
      userId: user.id,
      spaceId,
      date,
      timeSlot,
      createdAt: new Date().toISOString(),
    };
    setAllBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  }

  function cancelBooking(bookingId) {
    setAllBookings((prev) => prev.filter((b) => b.id !== bookingId));
  }

  function bookingsForUser(userId) {
    if (!userId) return [];
    return allBookings.filter((b) => b.userId === userId);
  }

  return (
    <BookingContext.Provider
      value={{ allBookings, addBooking, cancelBooking, bookingsForUser }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}
