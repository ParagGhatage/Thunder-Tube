import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = ({ isAuthenticated, setIsAuthenticated, cookies }) => {
  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const accessToken = cookies.accessToken;
      const response = await axios.post('https://thunder-tube-backend.vercel.app/api/v1/users/change-password', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
        <div className="container mx-auto max-w-md mt-20 bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Change Password</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
            <label className="block">
                <span className="text-gray-700 font-semibold">Old Password:</span>
                <input
                    type="password"
                    name="oldpassword"
                    value={formData.oldpassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
            </label>

            <label className="block">
                <span className="text-gray-700 font-semibold">New Password:</span>
                <input
                    type="password"
                    name="newpassword"
                    value={formData.newpassword}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
            </label>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline"
            >
                Change Password
            </button>
        </form>
    </div>

  );
};

export default ChangePassword;
