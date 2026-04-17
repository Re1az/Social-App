
import mongoose from "mongoose";
import { User } from "../models/userModel.js";
import TryCatch from "../utils/TryCatch.js";

export const profile=TryCatch(async(req,res)=>{
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
  if(!user)
    return res.status(404).json({
      message:"User not found"
    })
  res.status(200).json({
    message:"Profile",
    user
  })
})