import React, { useState } from 'react';
import axios from 'axios';

const Togglesubscribe = ({ channelId, cookies }) => {
  const [subscribed, setSubscribed] = useState(false);

  const checkSubscription = async () => {
    try {
      const accessToken = cookies.accessToken;
      const response = await axios.post(
        `https://thunder-tube-backend.vercel.app/api/v1/users/subscribe/${channelId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setSubscribed(!subscribed);
      console.log(response);
    } catch (error) {
      console.error('Error toggling subscription:', error);
    }
  };

  return (
    <div>
      <button
        onClick={checkSubscription}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${subscribed ? 'bg-red-500' : ''}`}
      >
        {subscribed ? 'Unsubscribe' : 'Subscribe'}
      </button>
    </div>
  );
};

export default Togglesubscribe;
