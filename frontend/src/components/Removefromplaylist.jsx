import React, { useState } from 'react';
import axios from 'axios';

const Removefromplaylist = ({ playlistId, videoId ,cookies}) => {
  const [message, setMessage] = useState('');

  const handleRemoveVideo = async () => {
    try {
        const accessToken = cookies.accessToken;
      const response = await axios.delete(`https://thunder-tube-backend.vercel.app/api/v1/users/removefromplaylist/${playlistId}/${videoId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      });
      setMessage(response.data.message); // Assuming your backend sends a message
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <button onClick={handleRemoveVideo} className='bg-red-400 hover:bg-amber-600 rounded-md p-5'>Remove Video from Playlist</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Removefromplaylist;
