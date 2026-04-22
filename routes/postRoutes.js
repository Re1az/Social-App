import express from "express";
import { commentonPost, createPost, deleteComment, deletePost, getAllPosts, getSinglePost, likeUnlike, updatePost } from "../controllers/postControllers.js";
import { isAuth } from "../middleware/isAuth.js";
import uploadFile from "../middleware/multer.js";



const router = express.Router();
router.route('/').get(isAuth,getAllPosts).post(isAuth,uploadFile,createPost);
router.route('/:id').get(isAuth,getSinglePost).delete(isAuth,deletePost).put(isAuth,uploadFile,updatePost);
router.route('/like/:id').post(isAuth,likeUnlike);
router.route('/comment/:id').post(isAuth,commentonPost).delete(isAuth,deleteComment);


export default router;