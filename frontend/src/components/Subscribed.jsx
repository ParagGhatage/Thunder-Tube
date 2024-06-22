import React, { useState } from 'react';
import axios from 'axios';

const Subscribers = ({ channelId, cookies }) => {
  const [subscribersCount, setSubscribersCount] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const response = await axios.get(
        `https://thunder-tube-backend.vercel.app/api/v1/users/subscribers/${channelId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSubscribersCount(response.data.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={fetchSubscribers}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {loading ? 'Loading...' : 'Subscribers'}
      </button>
      {subscribersCount !== null && (
        <div className="ml-4">
          <p className="text-gray-700">
            Subscribers: <span className="font-semibold">{subscribersCount}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default Subscribers;
