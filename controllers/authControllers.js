import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import getDataUrl from "../utils/urlGenerator.js";
import bcrypt from 'bcrypt';
import cloudinary from "cloudinary";


export const registerUser=async(req,res)=>{
  // console.log('register hit');
  // console.log('body:',req.body);
  // console.log('file:',req.file);
  try{
    const{name,email,password,bio}=req.body;

    const file=req.file;

    if(!name || !email || !password){
      return res.status(400).json({
        message:"name,email and password are required"
      })
    }
     if (!file) {
      return res.status(400).json({
        message: "Profile image is required"
      });
    }

    let user=await User.findOne({email});
    if(user)
     return res.status(400).json({
        message:"user already exists!!! Try login in... "
      });
    const fileUrl= getDataUrl(file);
    const hashPassword=await bcrypt.hash(password,10);

    const myCloud=await cloudinary.v2.uploader.upload(fileUrl.content);

    user=await User.create({
      name,
      email,
      password:hashPassword,
      bio,
      profilePic:{
        id:myCloud.public_id,
        url:myCloud.secure_url
      }
    });
    //cookie plus token
    generateToken(user._id,res);

    res.status(201).json({
      message:"user created successfully",
      user
    })


    // const token=user.getJWTToken();
    // res.status(201).json({
    //   success:true,
    //   token
    // })


  }
  catch(err){
    res.status(500).json({
      message:err.message
    })
  }
};