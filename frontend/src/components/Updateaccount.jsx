import React, { useState } from 'react';
import axios from 'axios';

const Updateaccount = (cookies) => {
  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    const accessToken =cookies.cookies.accessToken;
      const response = await axios.patch(`https://thunder-tube-backend.vercel.app/api/v1/users/update-account`, {
        fullName,
        email
      },{headers: {
        Authorization: `Bearer ${accessToken}`,

      }});
      console.log(response)
      
      if (response.status === 200) {
        setMessage('Account details updated successfully');
      }
    
  };

  return (
        <div className="container mx-auto max-w-md mt-20 bg-white p-8 shadow-md rounded-lg">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">Update Account Details</h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
                <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-2">Full Name:</label>
                <input 
                    type="text" 
                    id="fullName" 
                    value={fullName} 
                    onChange={(e) => setFullname(e.target.value)} 
                    className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email:</label>
                <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="block w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:shadow-outline"
            >
                Update Details
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

export default Updateaccount;
