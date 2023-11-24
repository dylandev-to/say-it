import React, { createContext, useContext, useState } from "react";

// Create a context for managing authentication
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // State to track whether the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to set the authentication status
  const setAuthentication = (value) => {
    setIsAuthenticated(value);
  };

  // Function to get the current authentication status
  const getIsAuthenticated = () => {
    return isAuthenticated;
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthentication, getIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
