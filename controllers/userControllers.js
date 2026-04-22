
import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinaery from "cloudinary";
import bcrypt from "bcrypt";

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
      const indexFollowing=loggedInUser.followings.indexOf(user._id);
      const indexFollowers=user.followers.indexOf(loggedInUser._id);
      loggedInUser.followings.splice(indexFollowing,1);
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
});

export const updateProfile=TryCatch(async(req,res)=>{
  const user=await User.findById(req.user._id);
  const {name,bio}=req.body;
  if (name){
    user.name=name;
  }
  if (bio){
    user.bio=bio;
  }
  const file=req.file;
  if(file){
    const fileUrl=getDataUrl(file);
    await cloudinaery.v2.uploader.destroy(user.profilePic.id);
    const myCloud=await cloudinaery.v2.uploader.upload(fileUrl.content);
    user.profilePic={
      id:myCloud.public_id,
      url:myCloud.secure_url
    }
  }
  await user.save();
  res.status(200).json({
    message:"Profile updated",
    user
  })

  
});

export const updatePassword=TryCatch(async(req,res)=>{
  const user=await User.findById(req.user._id);
  const {oldPassword,newPassword}=req.body;
  const comparePassword=await bcrypt.compare(oldPassword,user.password);
  if(!comparePassword){
    return res.status(400).json({
      message:"Old password is incorrect"
    })
  }
  if(oldPassword===newPassword){
    return res.status(400).json({
      message:"New password cannot be same as old password"
    })
  }

  const hashPassword=await bcrypt.hash(newPassword,10);
  user.password=hashPassword;
  await user.save();
  res.status(200).json({
    message:"Password updated"
  })
})