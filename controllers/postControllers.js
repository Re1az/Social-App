import { Post } from "../models/postModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";

export const createPost=TryCatch(async(req,res)=>{
  const {caption}=req.body;
  const ownerId=req.user._id;
  const file=req.file;
  let postData={};
  let type="text";//default
  if (file){
    const fileUrl=getDataUrl(file);
    const isVideo=req.query.type==="video";
    const myCloud=await cloudinary.v2.uploader.upload(fileUrl.content,{resource_type: isVideo ? "video" : "image"});
    postData={
      public_id:myCloud.public_id,
      url:myCloud.secure_url
    }
    type=isVideo?"video":"image";
    
  }
  

  
  const post=await Post.create({
    caption,
    post:file?postData:undefined,
    owner:ownerId,
    type,
  })
  console.log(post);
  res.status(201).json({
    message:"Post created successfully",
    post
  })
})

export const deletePost=TryCatch(async(req,res)=>{
  console.log(req.params.id)
  const post =await Post.findById(req.params.id);
  console.log(post);
if(!post)
  return res.status(404).json({
    message:"Post not found"
  })
  if(post.owner.toString()!==req.user._id.toString())
    return res.status(401).json({
      message:"You cannot delete this post"
    });
    if(post.post?.public_id){
      await cloudinary.v2.uploader.destroy(post.post.public_id,{resource_type: post.type === "video" ? "video" : "image"});
    }
  await post.deleteOne();
  res.status(200).json({
    message:"Post deleted successfully"
  })
});

export const getAllPosts=TryCatch(async(req,res)=>{
  const posts=await Post.find().sort({createdAt:-1}).limit(20).populate("owner","-password").populate("comments.user","-password");
  res.status(200).json({
    message:"Posts fetched successfully",
    posts
  })
})
export const getSinglePost = TryCatch(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("owner", "-password")
    .populate("comments.user", "-password");

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  res.status(200).json({
    message: "Post fetched successfully",
    post
  });
});
export const updatePost = TryCatch(async (req, res) => {
  const { caption } = req.body;
  const file = req.file;

  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return res.status(401).json({
      message: "You cannot update this post"
    });
  }

  // ✅ 1. Update caption (optional)
  if (caption !== undefined) {
    post.caption = caption;
  }

  // ✅ 2. If new media is uploaded
  if (file) {
    const fileUrl = getDataUrl(file);

    const isVideo = req.query.type === "video";

    // Upload new file
    const myCloud = await cloudinary.v2.uploader.upload(
      fileUrl.content,
      {
        resource_type: isVideo ? "video" : "image"
      }
    );

    // ❌ Delete old media if exists
    if (post.post?.public_id) {
      await cloudinary.v2.uploader.destroy(post.post.public_id, {
        resource_type: post.type === "video" ? "video" : "image"
      });
    }

    // ✅ Replace with new media
    post.post = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url
    };

    post.type = isVideo ? "video" : "image";
  }

  await post.save();

  res.status(200).json({
    message: "Post updated successfully",
    post
  });
});