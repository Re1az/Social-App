import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";

export const isAuth=async(req,res,next)=>{
  // console.log("Token:",req.cookies.jwt);
  try{
    const token=req.cookies.jwt;
    if(!token)return res.status(403).json({
      message:"No user found!!Unauthorized"
    })
    const decoded=jwt.verify(token,process.env.JWT_SECRET);

    // console.log(decoded);

    if(!decoded)return res.status(403).json({
      message:"Unauthorized"
    })
    
    req.user=await User.findById(decoded.id);
    // console.log("The req user is:",req.user);
    next();

  }catch(err){
    res.status(500).json({
      message:err.message
    }); 
    }
}