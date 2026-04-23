//This imports the User model from MongoDB.
import { User } from "../models/userModel.js";

//This imports a function that creates JWT token.
//JWT = Login identity card.
//When user logs in/registers, token is created and saved in cookie.
import generateToken from "../utils/generateToken.js";

import TryCatch from "../utils/TryCatch.js";

//When image is uploaded, it converts image into URL/Base64 format so Cloudinary can upload it.
import getDataUrl from "../utils/urlGenerator.js";

//Used to hash password.
import bcrypt from 'bcrypt';

//Used to upload images online.
//Like profile picture storage.
import cloudinary from "cloudinary";


export const registerUser=TryCatch(async(req,res)=>{
//checking what data is coming in
  console.log("Register hit");
  console.log("Body:",req.body);
  console.log("file:",req.file);
//destructuring the data that comes in req.body from front end
    const{name,email,password,bio}=req.body;
//destructuring the data that comes in req.file from front end
    const file=req.file;
  //validations
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
//checking if user already exists
    let user=await User.findOne({email});
    if(user)
     return res.status(400).json({
        message:"user already exists!!! Try login in... "
      });
    const fileUrl= getDataUrl(file);
    const hashPassword=await bcrypt.hash(password,10);
//uploading image in cloudinary
    const myCloud=await cloudinary.v2.uploader.upload(fileUrl.content);
//creating user in DB
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
//sending response if user is created 
    res.status(201).json({
      message:"user created successfully",
      user //user is the user that was created
    })


    // const token=user.getJWTToken();
    // res.status(201).json({
    //   success:true,
    //   token
    // })

})

export const loginUser=TryCatch(async(req,res)=>{
  //checking what data is coming in 
  // console.log("body:",req.body);
  //destructuring the data that comes in req.body from front end
  const {email,password}=req.body;
  //validations if user exists
  const user=await User.findOne({email});
//if user doesn't exist
  if(!user)return res.status(400).json({
    message:"Invalid Credentials.Try again"
  });
  //checking if password is correct with hashed password
  const comparePassword=await bcrypt.compare(password,user.password);
  if(!comparePassword)
    return res.status(400).json({
    message:"Invalid  Credentials"
  })
  //creating cookie plus token
  generateToken(user._id,res);
  //sending response
  res.json({
    message:"Login successful",
    user,//user is the user that was logged in
  })

})
export const logoutUser=TryCatch((req,res)=>{
  //deleting cookie
  res.cookie('jwt',null,{expires:new Date(Date.now()),httpOnly:true});
  res.status(200).json({
    message:"Logout successful"
  })
})