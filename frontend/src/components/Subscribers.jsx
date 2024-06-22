import React, { useState } from 'react';
import axios from 'axios';

const Subscribers = ({ channelId, cookies }) => {
  const [successMessage, setSuccessMessage] = useState('');

  const checkSubscription = async () => {
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

      setSuccessMessage(`Subscribers: ${response.data.data}`);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching subscribers:', error);
    }
  };

  return (
    <div>
      <button
        onClick={checkSubscription}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Subscribers
      </button>
      {successMessage && (
        <p className="text-green-600 mt-2">{successMessage}</p>
      )}
    </div>
  );
};

export default Subscribers;
