import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useLocalStorage("ssp_user", null);
  const [userRegistry, setUserRegistry] = useLocalStorage("ssp_user_registry", []);

  function login(name = "Student") {
    // Check if user with this name already exists
    const existingUser = userRegistry.find(u => u.name === name);
    
    let userObj;
    if (existingUser) {
      // Reuse existing user ID
      userObj = existingUser;
    } else {
      // Create new user and add to registry
      userObj = { id: Date.now(), name };
      setUserRegistry(prev => [...prev, userObj]);
    }
    
    setUser(userObj);
    return userObj;
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}