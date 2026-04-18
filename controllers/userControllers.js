
import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import TryCatch from "../utils/TryCatch.js";

export const myProfile=TryCatch(async(req,res)=>{
  // console.log(req.user);
  const user=await User.findById(req.user._id).select('-password');
  // console.log(typeof user.email);

  res.status(200).json({
    message:"Profile",
    user
  })
})

export const userProfile=TryCatch(async(req,res)=>{

  if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(400).json({
      message:"Invalid user id"
    })
  const user=await User.findById(req.params.id).select('-password');
  console.log(user);
  if(!user)
    return res.status(404).json({
      message:"User not found"
    })
  res.status(200).json({
    message:"Profile",
    user
  })
})

export const followandunfollowUser=TryCatch(async(req,res)=>{
  const user=await User.findById(req.params.id);
  const loggedInUser=await User.findById(req.user._id);

  if (!user)
    return res.status(404).json({
      message:"User not found"
    })
    if (user._id.toString()===loggedInUser._id.toString())
      return res.status(400).json({
        message:"You cannot follow yourself"
      })
    if (user.followers.includes(loggedInUser._id)){
      const indexFollowing=loggedInUser.follwing.indexOf(user._id);
      const indexFollowers=user.followers.indexOf(loggedInUser._id);
      loggedInUser.follwing.splice(indexFollowing,1);
      await loggedInUser.save();
      user.followers.splice(indexFollowers,1);
      await user.save();
      res.status(200).json({
        message:"Unfollowed successfully"
      })
    
      
    }else{
      loggedInUser.follwing.push(user._id);
      await loggedInUser.save();
      user.followers.push(loggedInUser._id);
      await user.save();
      res.status(200).json({
        message:"Followed successfully"
      })
     
    }
});

export const userFollowersandFollowingData=TryCatch(async(req,res)=>{
  
  const user=await User.findById(req.params.id).select('-password').populate("followers","-password").populate("followings","-password");
  console.log(user);
  const followers=user.followers;
  const followings=user.followings;

  res.status(200).json({
    message:"Followers and following",
    followers,
    followings
  })
})