import React, { useState } from 'react';
import axios from 'axios';

const Createplaylist = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = cookies.accessToken;
      const response = await axios.post('https://thunder-tube-backend.vercel.app/api/v1/users/createplaylist', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data); // Assuming backend sends a success message
      // Clear form data after successful submission
      setFormData({ name: '', description: '' });
    } catch (error) {
      console.error('Error creating playlist:', error);
      // Handle error, e.g., show an error message to the user
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Create Playlist</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields for playlist name and description */}
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter playlist name"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700">
              Description:
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              placeholder="Enter playlist description"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default Createplaylist;
