import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Subscribers from './Subscribers';
import Subscribed from './Subscribed';

const Getcurrentuser = ({ cookies }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const accessToken = cookies.cookies.accessToken;
        const response = await axios.get('https://thunder-tube-backend.vercel.app/api/v1/users/current-user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, [cookies.cookies.accessToken]);

  if (!currentUser) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="my-8">
        <h1 className="text-3xl font-bold mb-2">Welcome, {currentUser.userName}</h1>
        <p className="text-lg mb-2">Email: {currentUser.email}</p>
        <p className="text-lg mb-4">Full Name: {currentUser.fullName}</p>

        {/* Add more user information as needed */}
        <div className="flex justify-center space-x-4">
          <Subscribers cookies={cookies.cookies} channelId={currentUser._id} />
          <Subscribed cookies={cookies.cookies} />
        </div>
      </div>
    </div>
  );
};

export default Getcurrentuser;
