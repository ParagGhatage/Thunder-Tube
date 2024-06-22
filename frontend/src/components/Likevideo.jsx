import React, { useState } from 'react';
import axios from 'axios';
import { ThumbsUp } from 'lucide-react';
import Toggle from './ui/Toggle'; // Assuming Toggle component is in ./ui/Toggle

const Likevideo = ({ videoId, cookies }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeToggle = async () => {
    try {
      const accessToken = cookies.accessToken;
      const response = await axios.post(
        `https://thunder-tube-backend.vercel.app/api/v1/users/like/${videoId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div>
      <button onClick={handleLikeToggle} className="flex items-center bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
        <Toggle>
          <ThumbsUp className={`fill-current ${isLiked ? 'text-blue-500' : 'text-gray-500'}`} />
        </Toggle>
        <span className="ml-2">{isLiked ? 'Liked' : 'Like'}</span>
      </button>
    </div>
  );
};

export default Likevideo;
