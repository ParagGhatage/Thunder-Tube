import mongoose from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const userId=req.user._id;
  const getvideocount=await Video.countDocuments({owner:userId});
  console.log(getvideocount);
  const getlikecount=await like.countDocuments({likedby:userId});
  console.log(getlikecount);
  const getsubscribercount=await Video.countDocuments({channel:userId});
  console.log(getsubscribercount);
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
 const channelId=req.user._id;
const allvideos=await Video.find({owner:channelId});
console.log(allvideos);
return res
.status(201)
.json(new ApiResponse(200,allvideos, "These are all videos by channel"));
});
const getChanVideos = asyncHandler(async (req, res) => {
    // TODO: Get all the videos uploaded by the channel
 const {channel}=req.params;
const allvideos=await Video.find({owner:channel});
console.log(allvideos);
return res
.status(201)
.json(new ApiResponse(200,allvideos, "These are all videos by channel"));
});


export {
    getChannelStats, 
    getChannelVideos,
    getChanVideos
    }