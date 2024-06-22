import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteVideo from './DeleteVideo';
import Commentvideo from './Commentvideo'; // Corrected import typo
import Videocomments from './Videocomments';
import Deletemycomments from './Deletemycomments';

const Channel = ({ isAuthenticated, setIsAuthenticated, cookies, channel }) => {
    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const accessToken = cookies.accessToken;
            const response = await axios.get(`https://thunder-tube-backend.vercel.app/api/v1/users/chanvideos/${channel}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setVideos(response.data.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-4">Video List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map(video => (
                    <div key={video._id} className="border border-gray-300 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                        <p className="text-gray-700 mb-2">{video.description}</p>
                        <div className="aspect-w-16 aspect-h-9 mb-4">
                            <video className="object-cover rounded-lg" controls>
                                <source src={video.videoFile} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <a
                            href={video.videoFile}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-blue-500 hover:underline"
                        >
                            Watch Video
                        </a>
                        <div className="flex justify-between items-center mt-2">
                            <DeleteVideo videoId={video._id} />
                            <Commentvideo videoId={video._id} cookies={cookies} />
                            <Deletemycomments videoId={video._id} cookies={cookies} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Channel;
