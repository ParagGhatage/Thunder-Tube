import React from 'react';
import axios from 'axios';

const DeletePlaylist = ({ playlistId, cookies }) => {
    const handleDelete = async () => {
        try {
            const accessToken = cookies.accessToken;
            const response = await axios.delete(`https://thunder-tube-backend.vercel.app/api/v1/users/deleteplaylist/${playlistId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('Playlist deleted successfully');
            // Optionally, update the UI or perform any other action after deletion
        } catch (error) {
            console.error('Error deleting playlist:', error);
            // Handle error, e.g., show an error message
        }
    };

    return (
        <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
            Delete Playlist
        </button>
    );
};

export default DeletePlaylist;
