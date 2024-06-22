import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, logout }) => {
  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding with a styled title */}
        <Link to="/" className="text-white text-3xl font-extrabold tracking-tight hover:text-gray-100 transition duration-300">
          ThunderTube
        </Link>

        <div className="space-x-4">
          {/* Navigation links */}
          <Link to="/" className="text-white hover:text-gray-100 transition duration-300">Home</Link>
          <Link to="/dashboard" className="text-white hover:text-gray-100 transition duration-300">Dashboard</Link>
          <Link to="/actions" className="text-white hover:text-gray-100 transition duration-300">Actions</Link>

          {/* Conditional rendering of authentication links */}
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white hover:text-gray-100 transition duration-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-100 transition duration-300">Register</Link>
            </>
          )}

          {/* Conditional rendering of Logout button */}
          {isAuthenticated && (
            <button onClick={handleLogout} className="text-white hover:text-gray-100 transition duration-300 bg-transparent border border-white py-2 px-4 rounded hover:bg-white hover:border-transparent">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
