import express from "express";
import { createPost, deletePost, getAllPosts, getSinglePost, updatePost } from "../controllers/postControllers.js";
import { isAuth } from "../middleware/isAuth.js";
import uploadFile from "../middleware/multer.js";



const router = express.Router();
router.route('/').get(isAuth,getAllPosts).post(isAuth,uploadFile,createPost);
router.route('/:id').get(isAuth,getSinglePost).delete(isAuth,deletePost).put(isAuth,uploadFile,updatePost);


export default router;