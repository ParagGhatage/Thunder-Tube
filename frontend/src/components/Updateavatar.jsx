import React, { useState } from 'react';
import axios from 'axios';

const Updateavatar = ({cookies}) => {
  const [avatar, setAvatar] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('avatar', avatar);
    const accessToken = cookies.accessToken;

    try {
      const response = await axios.patch(
        'https://thunder-tube-backend.vercel.app/api/v1/users/update-image',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${accessToken}`,
          }
        }
      );
      console.log(response);
    } catch (error) {
      console.error('Error uploading avatar:', error);
    }
  };

  return (
        <div className="container mx-auto max-w-md mt-20 bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Update User Avatar</h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="flex items-center justify-center">
                <input 
                    type="file" 
                    onChange={handleFileChange} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline"
            >
                Upload Avatar
            </button>
        </form>
        {message && (
            <p className={`mt-4 text-center font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                {message.text}
            </p>
        )}
    </div>

  );
};

export default Updateavatar;
