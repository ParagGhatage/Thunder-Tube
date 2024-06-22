import React from 'react';
import { Link } from 'react-router-dom';
import GetCurrentUser from './GetCurrentUser'; // Assuming GetCurrentUser component is in ./GetCurrentUser

const Home = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="my-8 text-center">
        <GetCurrentUser cookies={cookies} />
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <Link to="/dashboard">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300">
              My Playlists
            </button>
          </Link>
          <Link to="/channelvideos">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition duration-300">
              My Videos
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
