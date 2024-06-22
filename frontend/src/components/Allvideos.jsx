import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Commentvideo from './Commentvideo'; // Corrected import typo
import Videocomments from './Videocomments';
import Addtoplaylist from './Addtoplaylist';
import Togglesubscribe from './Togglesubscribe';
import Subscribers from './Subscribers';
import Subscribed from './Subscribed';
import Chanprofile from './Chanprofile';
import Likevideo from './Likevideo';
import { Button } from './ui/button';

const Allvideos = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
    const [videos, setVideos] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const accessToken = cookies.accessToken;
            const response = await axios.get('https://thunder-tube-backend.vercel.app/api/v1/users/getall');
            setVideos(response.data.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const toggleAddToPlaylist = () => {
        setShowAddToPlaylist(!showAddToPlaylist);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6 text-center">All Videos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.map(video => (
                    <div key={video._id} className="border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 className="text-xl md:text-2xl font-semibold mb-2">{video.title}</h3>
                        <p className="text-gray-700 mb-4">{video.description}</p>
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                            <video className="object-cover rounded-lg w-full" controls>
                                <source src={video.videoFile} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <a href={video.videoFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline block mb-4">Watch Video</a>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <Button onClick={toggleComments} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                Comments
                            </Button>
                            {showComments && <Commentvideo videoId={video._id} cookies={cookies} />}
                            {showComments && <Videocomments videoId={video._id} />}
                            <Button onClick={toggleAddToPlaylist} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300">
                                Add to Playlist
                            </Button>
                            {showAddToPlaylist && <Addtoplaylist cookies={cookies} videoToAdd={video._id} />}
                        </div>
                        <Chanprofile cookies={cookies} channelId={video.owner} />
                        <Likevideo videoId={video._id} cookies={cookies} />
                    </div>
                ))}
            </div>
            <div className="mt-8">
                <Subscribed cookies={cookies} />
            </div>
        </div>
    );
};

export default Allvideos;
