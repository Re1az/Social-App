import { populate } from "dotenv";
import { Post } from "../models/postModel.js";
import TryCatch from "../utils/TryCatch.js";
import getDataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
export const createPost = TryCatch(async (req, res) => {
  const { caption } = req.body;
  const ownerId = req.user._id;
  const file = req.file;

  let postData = null;
  let type = "text";

  if (file) {
    const fileUrl = getDataUrl(file);

    const myCloud = await cloudinary.v2.uploader.upload(
      fileUrl.content,
      {
        resource_type: "auto",
      }
    );

    postData = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    type = file.mimetype.startsWith("video") ? "video" : "image";
  }

  const post = await Post.create({
    caption,
    post: postData,
    owner: ownerId,
    type,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
});

export const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ owner: req.params.id })
      .populate("owner", "name profilePic",).select("-password");
res.status(200).json({
  message:"User Posts fetched",
  posts
});
    // res.json(posts);
   
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
  const posts=await Post.find().sort({createdAt:-1}).limit(20).populate("owner","-password").populate("comments.user","-password")
  res.status(200).json({
    message:"Posts fetched",
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

export const likeUnlike=TryCatch(async(req,res)=>{
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }

  if (post.likes.includes(req.user._id)) {
    const index = post.likes.indexOf(req.user._id);
    post.likes.splice(index, 1);
    await post.save();
    res.status(200).json({
      message: "Post unliked successfully"
    });
  } else {
    post.likes.push(req.user._id);
    await post.save();
    res.status(200).json({
      message: "Post liked successfully"
    });
  }
})

export const commentonPost=TryCatch(async(req,res)=>{
  const post=await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({
      message: "Post not found"
    });
  }
  const comment={
    user:req.user._id,
    name:req.user.name,
    comment:req.body.comment
  }
  post.comments.push(comment);
  await post.save();
  res.status(200).json({
    message:"Commented on post successfully"
  })
})
export const deleteComment = TryCatch(async (req, res) => {
  if (!req.body.commentId) {
    return res.status(400).json({
      message: "commentId is required"
    });
  }

  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const commentIndex = post.comments.findIndex(
    (item) => item._id?.toString() === req.body.commentId.toString()
  );

  if (commentIndex === -1) {
    return res.status(404).json({ message: "Comment not found" });
  }

  const comment = post.comments[commentIndex];

  if (
    comment.owner?.toString() === req.user?._id?.toString() ||
    comment.user?.toString() === req.user?._id?.toString()
  ) {
    post.comments.splice(commentIndex, 1);
    await post.save();

    return res.status(200).json({
      message: "Comment deleted successfully"
    });
  }

  return res.status(401).json({
    message: "You cannot delete this comment"
  });
});