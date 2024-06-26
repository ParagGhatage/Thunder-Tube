// src/App.js//initialized repository
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Navbar from './components/Navbar';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import Upload from './components/Upload';
import Home from './components/Home';
import VideoList from './components/Videolist';
import ChangePassword from './components/ChangePassword';
import Allvideos from './components/Allvideos';
import Actions from './components/Actions';
import Createplaylist from './components/Createplaylist';
import Addtoplaylist from './components/Addtoplaylist';
import Dashboard from './components/Dashboard';
import Getcurrentuser from './components/Getcurrentuser';
import Togglesubscribe from './components/Togglesubscribe';
import Subscribers from './components/Subscribers';
import Updateaccount from './components/Updateaccount';
import Updateavatar from './components/Updateavatar';

const App = () => {
  // State to manage authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Cookies hook for managing cookies
  const [cookies, setCookies, removeCookies] = useCookies(['accessToken', 'refreshToken']);

  // Check if the user is already authenticated based on cookies
  useEffect(() => {
    const accessToken = cookies.accessToken;
    const refreshToken = cookies.refreshToken;

    if (accessToken && refreshToken) {
      setIsAuthenticated(true);
    }
  }, [cookies]);

  // Logout function to clear cookies and update authentication status
  const logout = async() => {
    const accessToken=cookies.accessToken
    const response =await axios.post('https://thunder-tube-backend.vercel.app/api/v1/users/logout',null,{headers: {
      Authorization: `Bearer ${accessToken}`
    }
})
    console.log(response)
    removeCookies('accessToken', { path: '/' });
    removeCookies('refreshToken', { path: '/' });
    setIsAuthenticated(false);
    console.log("logged out succesfully")
  };
  

  return (
    
      <Router>
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} logout={logout} />
      
      <Routes>
        
        <Route path="/" element={<Allvideos isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} cookies={cookies} />} />
        <Route path="/Home" element={<Home cookies={cookies} />} />
        <Route path="/actions" element={<Actions isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} logout={logout} />} />
        <Route path="/login" element={<Login setCookies={setCookies} setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/upload" element={<Upload isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} cookies={cookies}/>} />
        <Route path="/changepassword" element={<ChangePassword isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} cookies={cookies}/>} />
        <Route path="/channelvideos" element={<VideoList isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} cookies={cookies}/>} />
        <Route path="/createplaylist" element={<Createplaylist isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} cookies={cookies}/>} />
        <Route path="/Register" element={<RegisterForm  />}/>
        <Route path="/addtoplaylist" element={<Addtoplaylist  />}/>
        <Route path="/dashboard" element={<Dashboard isAuthenticated={isAuthenticated} cookies={cookies} />}/>
        <Route path="/currentuser" element={<Getcurrentuser cookies={cookies}/>}/>
        <Route path="/updateaccount" element={<Updateaccount cookies={cookies}/>}/>
        <Route path="/updateimage" element={<Updateavatar cookies={cookies}/>}/>
        

       {/* <Route path="/getall" element={<Allviedeos isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} cookies={cookies}/>} />*/}
        
      </Routes>
    </Router>
    
  );
};

export default App;

//<PrivateRoute path="/dashboard" component={Dashboard} isAuthenticated={isAuthenticated} />