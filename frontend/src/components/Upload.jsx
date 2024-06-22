import React, { useState } from 'react';
import axios from 'axios';

const Upload = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
  const [formData, setFormData] = useState({
    title: '',
    videoFile: null, // File input
  });

  const handleChange = (e) => {
    if (e.target.name === 'videoFile') {
      // Handle file input separately
      setFormData({ ...formData, videoFile: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('videoFile', formData.videoFile);

    try {
      const accessToken = cookies.accessToken;
      const response = await axios.post('https://thunder-tube-backend.vercel.app/api/v1/users/publish', data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);
      // Optionally, reset the form fields after successful upload
      setFormData({
        title: '',
        videoFile: null,
      });
    } catch (error) {
      console.error('Error during upload:', error.message);
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20 bg-white shadow-lg rounded-lg px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input field for title */}
        <div>
          <label htmlFor="title" className="text-gray-700">
            Title:
          </label>
          <input
            id="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* File input for video */}
        <div>
          <label htmlFor="videoFile" className="text-gray-700">
            Video:
          </label>
          <input
            id="videoFile"
            type="file"
            name="videoFile"
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default Upload;
