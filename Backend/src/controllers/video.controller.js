import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";


const getAllVideos = asyncHandler(async (req, res) => {

const allvideos=await Video.find({});
//console.log(allvideos);
return res
.status(201)
.json(new ApiResponse(200,allvideos, "These are all videos by channel"));
       
})

//completed
const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} =req.body
    console.log(title)
    console.log(req.body)
    if(!title){
        throw new ApiError(400,"No title and description")
    }
    // TODO: get video, upload to cloudinary, create video
    const videofiles = req.files && req.files.videoFile;
    const videotarlocalpath = videofiles ? videofiles[0]?.path : null;
    const videotar=await UploadOnCloudinary(videotarlocalpath);
    console.log("Cloudinary response:",videotar);
    const user=await Video.create({
          thumbnail:videotar.thumbnail,
          title,
          description,
          videoFile:videotar.secure_url,
          duration:videotar.duration,
          owner:req.user._id,

    })
    console.log(user);
})
//completed
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    console.log(req.params)
    console.log(videoId)
    //TODO: get video by id
    const vid=await Video.findById(videoId);
    if(!vid){
        throw new ApiError(400,"video not found")
    }
    return vid
.status(201)
.json(new ApiResponse(200,vid, "These are all videos by channel"));
       
    //console.log(vid)
    //console.log(vid.title);
})
//completed
const updateVideo = asyncHandler(async (req, res) => {
    const { videoid } = req.params
    const { title,description } = req.body
    const vid=await Video.findById(videoid);
    console.log(vid.title)
    vid.title=title
    console.log(vid.title)
    vid.description=description
    console.log(vid.description);
    await vid.save();
    //TODO: update video details like title, description, thumbnail
    
})
//completed
const deleteVideo = asyncHandler(async (req, res) => {
    //TODO: delete video
    const { videoid } = req.params
    const vid=await Video.deleteOne({_id:videoid});
    console.log("video deleted");
    
})


const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoid } = req.params
    const vid=await Video.findById(videoid);
    if(!vid.isPublished){
        return false

    }
    else{
        return true
    }


})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
//maine video controller ke routes define karte waqt multer ka function use or describe  nahi kiya tha isliye req.body kam nahi kr raha tha

//65d7a4d43bc38b9c75c38477