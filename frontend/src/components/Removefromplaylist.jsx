import React, { useState } from 'react';
import axios from 'axios';

const Removefromplaylist = ({ playlistId, videoId, cookies }) => {
  const [message, setMessage] = useState('');

  const handleRemoveVideo = async () => {
    try {
      const accessToken = cookies.accessToken;
      const response = await axios.delete(
        `https://thunder-tube-backend.vercel.app/api/v1/users/removefromplaylist/${playlistId}/${videoId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage(response.data.message); // Assuming your backend sends a message
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div className="flex items-center">
      <button
        onClick={handleRemoveVideo}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Remove Video from Playlist
      </button>
      {message && <p className="text-green-600 ml-4">{message}</p>}
    </div>
  );
};

export default Removefromplaylist;
