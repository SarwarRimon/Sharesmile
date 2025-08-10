import React, { createContext, useState, useEffect, useContext } from 'react'; 
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

// Custom hook to access the AuthContext values
export const useAuth = () => {
  return useContext(AuthContext); 
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // Login function
  const login = (newToken) => {
    // Store token in localStorage and update authentication state
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage and update authentication state
    localStorage.removeItem('token');
    setIsAuthenticated(false);

    // Redirect to the login page
    navigate('/login');
  };

  // Check for stored token when the component mounts (useEffect)
  useEffect(() => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    if (token) {
      setIsAuthenticated(true);  // If token exists, consider the user authenticated
    }
  }, []);  // Empty dependency array ensures this effect runs only once (on mount)

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};
