"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context with a default value.
const AuthContext = createContext({ isLoggedIn: false });

// Define the provider component
export const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setIsLoggedIn(true);
    } catch (error: any) {
      setIsLoggedIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn }}>
      {isLoggedIn ? children : null}
    </AuthContext.Provider>
  );
};

// Hook for consuming context
export const useAuth = () => useContext(AuthContext);
