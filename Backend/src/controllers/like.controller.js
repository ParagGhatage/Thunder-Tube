import mongoose, { isValidObjectId } from "mongoose";
import { like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Video } from "../models/video.model.js";
import { Comment } from "../models/comment.model.js";
import { tweet } from "../models/tweet.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//completed
const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  const video = Video.findById(videoId);

  const existinglike = await like.findOne({
    video: videoId,
    likedBy: req.user._id,
  });
  console.log(existinglike);
  if (existinglike) {
    await existinglike.deleteOne();

    console.log("existing like deleted");
  }

  if (!existinglike) {
    const likee = await like.create({
      video: videoId,
      likedBy: req.user._id,
    });
    console.log("new like created");
    console.log(likee);
  }
});

//
const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  const comment = Comment.findById(commentId);
  const existingcommentlike = like.findOneAndDelete({
    comment: commentId,
    likedBy: req.user._id,
  });
  if (existingcommentlike) {
    console.log("comment like removed");
  }
  const newcommentlike = await like.create({
    comment: commentId,
    likedBy: req.user._id,
  });
  console.log(newcommentlike);
});


//completed
const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  console.log(tweetId);

  const Tweet = await tweet.findById(tweetId);
  console.log(Tweet);
  const existinglike = await like.findOne({
    tweets: tweetId,
    likedBy: req.user._id,
  });
  console.log(existinglike);
  if (existinglike) {
    await existinglike.deleteOne();
    console.log("existing like deleted");
  }

  if (!existinglike) {
    const newtweetlike = await like.create({
      tweets: tweetId,
      likedBy: req.user._id,
    });
    console.log(newtweetlike);
    console.log("created new like");
  }
});


//completed
const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos

  const likedvideos = like.find({ likedBy: req.user._id });
  console.log(likedvideos);
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
