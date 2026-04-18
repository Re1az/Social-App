import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";

export const isAuth=async(req,res,next)=>{
  // console.log("Token:",req.cookies.jwt);
  try{
    //Reads cookie named jwt
    const token=req.cookies.jwt;
    if(!token)return res.status(403).json({
      message:"No user found!!Unauthorized"
    })
    //It checks:
    // Is token real?
    // Is token expired?
    // Was token signed by your secret key?
    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    // console.log(decoded);

    if(!decoded)return res.status(403).json({
      message:"Unauthorized"
    })
    //Use token's id to find full user data. find user in DB
    req.user=await User.findById(decoded.id);
    // console.log("The req user is:",req.user);

  // Means:
  //Authentication successful.
  //Move to next controller.
    next();

  }catch(err){
    res.status(500).json({
      message:err.message
    }); 
    }
}