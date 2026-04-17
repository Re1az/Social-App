import { User } from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import bcrypt from 'bcrypt';
import cloudinary from "cloudinary";


export const registerUser=TryCatch(async(req,res)=>{
  console.log("Register hit");
  console.log("Body:",req.body);
  console.log("file:",req.file);
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

})

export const loginUser=TryCatch(async(req,res)=>{
  console.log("body:",req.body);
  const {email,password}=req.body;
  const user=await User.findOne({email});

  if(!user)return res.status(400).json({
    message:"Invalid Credentials.Try again"
  });
  const comparePassword=await bcrypt.compare(password,user.password);
  if(!comparePassword)
    return res.status(400).json({
    message:"Invalid  Credentials"
  })
  generateToken(user._id,res);
  res.json({
    message:"Login successful",
    user,
  })

})
export const logoutUser=TryCatch((req,res)=>{
  res.cookie('jwt',null,{expires:new Date(Date.now()),httpOnly:true});
  res.status(200).json({
    message:"Logout successful"
  })
})