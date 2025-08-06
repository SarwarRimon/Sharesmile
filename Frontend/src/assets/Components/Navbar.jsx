// src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUserRole(parsedUser.role); // Get role from localStorage
    }
  }, [isAuthenticated]); // Re-run when authentication state changes

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <h1 className="text-3xl font-bold">ShareSmaile</h1>
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? 'X' : '☰'}
        </button>
        <ul
          className={`md:flex md:gap-6 absolute md:static bg-blue-700 w-full md:w-auto top-16 left-0 md:flex-row flex-col items-center md:items-center space-y-4 md:space-y-0 transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}
        >
          <li>
            <NavLink to="/" onClick={handleLinkClick}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/campaigns" onClick={handleLinkClick}>Campaigns</NavLink>
          </li>
          <li>
            <NavLink to="/donation" onClick={handleLinkClick}>Donate</NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={handleLinkClick}>Contact</NavLink>
          </li>

          {/* Show Profile based on user role */}
          {isAuthenticated && userRole === 'admin' && (
            <li>
              <NavLink to="/admin-dashboard" onClick={handleLinkClick}>Profile</NavLink>
            </li>
          )}

          {isAuthenticated && userRole === 'donor' && (
            <li>
              <NavLink to="/dashboard" onClick={handleLinkClick}>Profile</NavLink>
            </li>
          )}

          {isAuthenticated && userRole === 'helpseeker' && (
            <li>
              <NavLink to="/profile" onClick={handleLinkClick}>Profile</NavLink>
            </li>
          )}

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          ) : (
            <li>
              <NavLink to="/login" onClick={handleLinkClick}>Login</NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
