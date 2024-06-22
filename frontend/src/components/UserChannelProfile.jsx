import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserChannelProfile = ({ username, cookies }) => {
  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const accessToken = cookies.cookies.accessToken;
        const response = await axios.get(`https://thunder-tube-backend.vercel.app/api/v1/users/c/${username}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setChannel(response.data.data);
      } catch (error) {
        console.error('Error fetching channel:', error);
      }
    };

    fetchChannel();
  }, [username, cookies]);

  if (!channel) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{channel.fullName}</h1>
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-600">Username: {channel.userName}</p>
        <p className="text-gray-600">Email: {channel.email}</p>
      </div>
      <div className="border-t border-gray-300 py-2">
        <p className="text-gray-600">Subscriber Count: {channel.subscribercount}</p>
        {/* Add more profile information as needed */}
      </div>
    </div>
  );
};

export default UserChannelProfile;
