import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, logout }) => {
  const handleLogout = () => {
    logout();
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 py-4 shadow-lg">
      <div className="container mx-auto xlg:flex lg:flex md:flex-wrap sm:flex-auto justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold hover:text-gray-100 transition duration-300">
          ThunderTube
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black hover:marker:cursor-context-menu focus:outline-black text-xl"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path scale={10} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
        <div className={`md:flex space-x-4 ${isOpen ? 'block' : 'hidden'}`}>
          <Link to="/" className="text-white hover:text-gray-100 transition duration-300">Home</Link>
          <Link to="/dashboard" className="text-white hover:text-gray-100 transition duration-300">Dashboard</Link>
          <Link to="/actions" className="text-white hover:text-gray-100 transition duration-300">Actions</Link>
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-white hover:text-gray-100 transition duration-300">Login</Link>
              <Link to="/register" className="text-white hover:text-gray-100 transition duration-300">Register</Link>
            </>
          )}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-100 transition duration-300 bg-transparent border border-white py-2 px-4 rounded hover:bg-white hover:border-transparent"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
