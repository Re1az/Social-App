import express from "express";
import { commentonPost, createPost, deleteComment, deletePost, editComment, getAllPosts, getPostComments, getSinglePost, getUserPosts, likeUnlike, updatePost } from "../controllers/postControllers.js";
import { isAuth } from "../middleware/isAuth.js";
import uploadFile from "../middleware/multer.js";



const router = express.Router();
router.route('/').get(isAuth,getAllPosts).post(isAuth,uploadFile,createPost);
router.get('/user/:id',isAuth,getUserPosts);
router.route('/:id').get(isAuth,getSinglePost).delete(isAuth,deletePost).put(isAuth,uploadFile,updatePost);


router.route('/like/:id').post(isAuth,likeUnlike);
router.route('/comment/:id').get(isAuth,getPostComments).post(isAuth,commentonPost).put(isAuth,editComment).delete(isAuth,deleteComment);



export default router;