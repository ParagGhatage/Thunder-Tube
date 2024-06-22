import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: '',
    avatar: null, // File input
  });

  const handleChange = (e) => {
    if (e.target.name === 'avatar') {
      // Handle file input separately
      setFormData({ ...formData, avatar: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('fullName', formData.fullName);
    data.append('userName', formData.userName);
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('avatar', formData.avatar);

    try {
      const response = await axios.post('https://thunder-tube-backend.vercel.app/api/v1/users/register', data);
      setSuccessMessage(response.data.message);
    } catch (error) {
      console.error('Error during registration:', error.message);
      setErrorMessage('Registration error! Please check your credentials.');
    }
  };

  return (
    <div className="container mx-auto max-w-md mt-20">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

          {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
          {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username:
              <input
                type="text"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Avatar:
              <input
                type="file"
                name="avatar"
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </label>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
