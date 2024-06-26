import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserChannelProfile from './UserChannelProfile';
import Togglesubscribe from './Togglesubscribe';
import Subscribers from './Subscribers';
import Subscribed from './Subscribed';
import Channel from './Channel';

const Getcurrentuser = (cookies) => {
  const [currentUser, setCurrentUser] = useState(null);
  console.log(cookies)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const accessToken =cookies.cookies.accessToken;
        console.log(accessToken)
        const response = await axios.get('https://thunder-tube-backend.vercel.app/api/v1/users/current-user', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        console.log(response)
        setCurrentUser(response.data.data);
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {currentUser.userName}</h1>
      <p>Email: {currentUser.email}</p>
      <p>Full Name: {currentUser.fullName}</p>
      
      
      {/* Add more user information as needed */}
      <Subscribers cookies={cookies.cookies} channelId={currentUser._id}/>
     {/* <Channel cookies={cookies.cookies} channel={currentUser._id}/>*/}
      <Subscribed cookies={cookies.cookies}/><br/>
    </div>
  );
};

export default Getcurrentuser;
