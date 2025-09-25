import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // "user" stores the currently logged-in user
  const [user, setUser] = useLocalStorage("ssp_user", null);

  // "userRegistry" keeps a list of all users that have logged in before
  const [userRegistry, setUserRegistry] = useLocalStorage("ssp_user_registry", []);

  // ----------------- Authentication Functions -----------------

  // Log in a user (default name = "Student")
  function login(name = "Student") {
    // Check if this user already exists in the registry
    const existingUser = userRegistry.find(u => u.name === name);
    
    let userObj;
    if (existingUser) {
      // If found, reuse that user
      userObj = existingUser;
    } else {
      // Otherwise, create a new user with unique ID
      userObj = { id: Date.now(), name };
      setUserRegistry(prev => [...prev, userObj]); // add new user to registry
    }
    
    setUser(userObj); // set as current user
    return userObj;   // return logged-in user object
  }

  // Log out current user (clear session)
  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using authentication data in components
export function useAuth() {
  return useContext(AuthContext);
}
