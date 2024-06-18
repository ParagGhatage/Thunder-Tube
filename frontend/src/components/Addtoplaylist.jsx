import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Addtoplaylist = ({ cookies, videoToAdd }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchPlaylists();
    }, []);

    const fetchPlaylists = async () => {
        const accessToken = cookies.accessToken;
        const response = await axios.get('https://thunder-tube-backend.vercel.app/api/v1/users/userplaylist', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setPlaylists(response.data.data);
    };

    const addToPlaylist = async () => {
        try {
            const accessToken = cookies.accessToken;
            const response = await axios.post(`https://thunder-tube-backend.vercel.app/api/v1/users/addtoplaylist/${selectedPlaylist}/${videoToAdd}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setSuccessMessage(response.data.message);
        } catch (error) {
            setErrorMessage('Error adding video to playlist.');
            console.error('Error adding video to playlist:', error);
        }
    };

    return (
                <div className="container mx-auto px-4 py-8 bg-white shadow-md rounded-lg">
            <h1 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Add to Playlist</h1>
            <div className="flex flex-col items-center">
                <select
                    className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 mb-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setSelectedPlaylist(e.target.value)}
                >
                    <option value="">Select a playlist</option>
                    {playlists.map((playlist) => (
                        <option key={playlist._id} value={playlist._id}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
                <button
                    className="w-full max-w-md bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={addToPlaylist}
                >
                    Add to Playlist
                </button>
                {successMessage && (
                    <p className="text-green-600 mt-4 font-medium">{successMessage}</p>
                )}
                {errorMessage && (
                    <p className="text-red-600 mt-4 font-medium">Error: {errorMessage}</p>
                )}
            </div>
        </div>

    );
};

export default Addtoplaylist;
