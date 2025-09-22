import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [user, setUser] = useLocalStorage("ssp_user", null);

  function login(name = "Student") {
    
    const userObj = { id: Date.now(), name };
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
