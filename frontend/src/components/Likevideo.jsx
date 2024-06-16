import React, { useState } from 'react'
import axios from 'axios';
import { ThumbsUp } from 'lucide-react';
import { Toggle } from './ui/toggle';
const Likevideo = (videoId,cookies) => {
    const[isLiked,setIsLiked]=useState();
    const handleLikeToggle = async () => {
    
        
         console.log(videoId,cookies)
         const videoId=videoId.videoId;
         console.log(videoId)
            const accessToken = videoId.cookies.accessToken;
            console.log(accessToken)
        const response = await axios.post(`https://thunder-tube.vercel.app/api/v1/users/like/${videoId}`,{},{ headers: {
            Authorization: `Bearer ${accessToken}`,
          }});
          setIsLiked(!isLiked);
        }
        
        return(<div>
   
    <button  onClick={handleLikeToggle}><Toggle><ThumbsUp className=' bg-slate-800  fill-slate-400'/></Toggle></button>

  </div>)
}


export default Likevideo
