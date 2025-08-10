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
    <nav className="bg-white/80 backdrop-blur-sm shadow-lg fixed w-full z-50 animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-pink-50/50 opacity-50"></div>
      <div className="container mx-auto flex justify-between items-center py-4 px-6 relative">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          ShareSmile
        </h1>
        
        <button 
          className="md:hidden rounded-xl p-2 text-gray-600 hover:text-purple-600 transition-all duration-300
                     relative group overflow-hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </div>
        </button>

        <ul className={`md:flex md:gap-3 absolute md:static bg-white/90 backdrop-blur-sm md:bg-transparent w-full md:w-auto 
                    top-16 left-0 md:flex-row flex-col p-4 md:p-0 border-b md:border-0 border-purple-100 
                    md:items-center space-y-2 md:space-y-0 transition-all duration-300 
                    shadow-xl md:shadow-none ${isOpen ? 'block animate-slide-down' : 'hidden'}`}>
          <li>
            <NavLink 
              to="/" 
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? "block px-4 py-2 text-purple-600 font-semibold rounded-lg bg-purple-50" 
                : "block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"}
            >
              Home
            </NavLink>
          </li>
          <li>
            {userRole === 'helpseeker' ? (
              <NavLink 
                to="/seek-help" 
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 text-purple-600 font-semibold rounded-lg bg-purple-50" 
                  : "block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"}
              >
                Seek Help
              </NavLink>
            ) : (
              <NavLink 
                to="/campaigns" 
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 text-purple-600 font-semibold rounded-lg bg-purple-50" 
                  : "block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"}
              >
                Campaigns
              </NavLink>
            )}
          </li>

          <li>
            <NavLink 
              to="/contact" 
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive ? "block px-4 py-2 text-purple-600 font-semibold rounded-lg bg-purple-50" 
                : "block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"}
            >
              Contact
            </NavLink>
          </li>

          {/* Donor History Link - Only show for donors */}
          {isAuthenticated && userRole === 'donor' && (
            <li>
              <NavLink 
                to="/donor-history" 
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 text-purple-600 font-semibold rounded-lg bg-purple-50" 
                  : "block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"}
              >
                My Donations
              </NavLink>
            </li>
          )}

          {/* Simple Profile Link */}
          {isAuthenticated && userRole === 'admin' && (
            <li>
              <NavLink 
                to="/admin/profile" 
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 text-purple-600 font-semibold rounded-lg bg-purple-50" 
                  : "block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"}
              >
                Profile
              </NavLink>
            </li>
          )}

          {isAuthenticated && userRole === 'donor' && (
            <li>
              <NavLink 
                to="/dashboard" 
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 text-purple-600 font-semibold rounded-lg bg-purple-50" 
                  : "block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"}
              >
                Profile
              </NavLink>
            </li>
          )}

          {isAuthenticated && userRole === 'helpseeker' && (
            <li>
              <NavLink 
                to="/profile" 
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  isActive ? "block px-4 py-2 text-purple-600 font-semibold rounded-lg bg-purple-50" 
                  : "block px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"}
              >
                Profile
              </NavLink>
            </li>
          )}

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <li>
              <button 
                onClick={logout}
                className="block w-full px-4 py-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors text-left"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <NavLink 
                to="/login" 
                onClick={handleLinkClick}
                className="block px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-md transition-all"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
