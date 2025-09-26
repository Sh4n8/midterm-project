import { useState, useEffect } from "react";

// Custom hook: keeps a state value in sync with localStorage
export default function useLocalStorage(key, initialValue) {
  // Initialize state: check localStorage first, else use initialValue
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch (error) {
      console.error("useLocalStorage parse error:", error);
      return initialValue;
    }
  });

  // Whenever "state" changes, update localStorage
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error("useLocalStorage set error:", error);
    }
  }, [key, state]);

  // Return state and function to update it (useState)
  return [state, setState];
}
