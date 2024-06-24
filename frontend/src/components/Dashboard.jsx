import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeletePlaylist from './DeletePlaylist';
import Removefromplaylist from './Removefromplaylist';

const Dashboard = ({ cookies }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        try {
            const accessToken = cookies.accessToken;

            const response = await axios.get('https://thunder-tube-backend.vercel.app/api/v1/users/userplaylist', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setPlaylists(response.data.data);
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    };

    const fetchVideosForPlaylist = async (playlistId) => {
        try {
            const accessToken = cookies.accessToken;
            const playlistResponse = await axios.get(`https://thunder-tube-backend.vercel.app/api/v1/users/playlistbyid/${playlistId}`, {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            console.log(playlistResponse)
            const playlistVideos = await Promise.all(
                playlistResponse.data.data.videos.map(async (videoId) => {
                    const videoResponse = await axios.get(`https://thunder-tube-backend.vercel.app/api/v1/users/videos/${videoId}`, {   headers: { Authorization: `Bearer ${accessToken}` } });
                    console.log(videoResponse)
                    return videoResponse.data.data.data.videoFile;
                })
            );
            setVideos(playlistVideos);
        } catch (error) {
            console.error('Error fetching videos for playlist:', error);
        }
    };

    const handlePlaylistClick = (playlistId) => {
        setSelectedPlaylist(playlistId);
        fetchVideosForPlaylist(playlistId);
    };

    return (
        <div className="container mx-auto px-4">
    <h1 className="text-3xl font-bold my-6 text-center">My Playlists</h1>
    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
            <li key={playlist._id} onClick={() => handlePlaylistClick(playlist._id)} className="border p-4 cursor-pointer text-black hover:bg-gray-100 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <div className="flex justify-between items-center">
                    <span className="font-semibold">{playlist.name}</span>
                    <DeletePlaylist playlistId={playlist._id} cookies={cookies}/>
                </div>
            </li>
        ))}
    </ul>
    {selectedPlaylist && (
        <div className="mt-8">
            <h2 className="text-2xl text-black font-bold my-4">Videos in {playlists.find((playlist) => playlist._id === selectedPlaylist)?.name}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video) => (
                    <li key={video._id} className="border p-4 rounded-lg shadow-md">
                        <p className="font-semibold mb-2">{video.title}</p>
                        <video controls className="md:w-full flex rounded-md">
                            <source src={video.videoFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <a href={video.videoFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline block mt-2">Watch Video</a>
                        <Removefromplaylist playlistId={selectedPlaylist} videoId={video._id} cookies={cookies}/>
                    </li>
                ))}
            </ul>
        </div>
    )}
</div>

    );
};

export default Dashboard;