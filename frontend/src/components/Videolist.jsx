import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteVideo from './DeleteVideo';
import Deletemycomments from './Deletemycomments';

const VideoList = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
    const [videos, setVideos] = useState([]);
    
    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            const accessToken = cookies.accessToken;
            const response = await axios.get(`https://thunder-tube-backend.vercel.app/api/v1/users/channelvideos`, {
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
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {videos.map(video => (
                    <div key={video._id} className="border border-gray-300 rounded-lg overflow-hidden">
                        <video className="w-full h-auto" controls>
                            <source src={video.videoFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2">{video.title}</h3>
                            <p className="text-gray-700 mb-2">{video.description}</p>
                            <a
                                href={video.videoFile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-blue-500 hover:underline mt-2"
                            >
                                Watch Video
                            </a>
                            <div className="mt-4 flex justify-between items-center">
                                <DeleteVideo videoId={video._id} />
                                <Deletemycomments videoId={video._id} cookies={cookies} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoList;
