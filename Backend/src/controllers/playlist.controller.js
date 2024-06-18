import mongoose, {isValidObjectId} from "mongoose"
import {playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js";


const createPlaylist = asyncHandler(async (req, res) => {
    //TODO: create playlist
    const {name, description} = req.body

    const list =await playlist.create({
        owner:req.user._id,
        name:name,
        description:description,
        videos:[]
    })
    console.log(list);
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    //TODO: get user playlists
    const userId= req.user._id;
    const list=await playlist.find({owner:userId});
    //console.log(userId);
    console.log(list);
    return res
    .status(201)
    .json(new ApiResponse(200,list, "These are all playlists"));

})

const getPlaylistById = asyncHandler(async (req, res) => {
    //TODO: get playlist by id
    const {playlistId} = req.params
    const list=await playlist.findById(playlistId);
    console.log(list);
    console.log("name of playlist is "+list.name)
    return res
    .status(201)
    .json(new ApiResponse(200,list, "These are all playlists"));

})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId,} = req.params
    const list =await playlist.findOne({_id:playlistId});
    if(!list){
        throw new ApiError(400,"Playlist not found");
    }
    console.log(list)
    const videos=await Video.findById(videoId);
    console.log(videos);
    console.log(videoId)
    if(!videos){
        throw new ApiError(400,"video not found");
    }
    list.videos.push(videos);
    await list.save();
    console.log(list);
    return res
    .status(200)
    .json(new ApiResponse(200,list,"video added to playlist"));
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    const list =await playlist.findById(playlistId);
    if(!list){
        throw new ApiError(400,"Playlist not found");
    }
    const video=await Video.findById(videoId);
    
    if(!video){
        throw new ApiError(400,"video not found");
    }
    list.video.pull(video);
    await list.save();
    
    return res
    .status(200)
    .json(new ApiResponse(200,list,"video  removed from playlist"));
})


const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
const list = await playlist.findByIdAndDelete(playlistId);
console.log
   await list.save()
   console.log(list)
    // TODO: delete playlist

})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    const list =await playlist.findByIdAndUpdate(playlistId,{name:name,
    description:description},{new:true})
    list.save();
    //TODO: update playlist
})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}