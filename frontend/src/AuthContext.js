import React, { createContext, useState, useContext } from 'react';

import { useNavigate } from 'react-router-dom';

import axios from "axios";

// Create a Context for authentication
const AuthContext = createContext();



// Custom hook to access the AuthContext
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check localStorage for saved login state
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const navigate = useNavigate();


  const login = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    return true;

  };

  const logout = () => {
    
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');

    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};