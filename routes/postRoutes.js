import express from "express";
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controllers/postControllers.js";


const router = express.Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').get(getPost).patch(updatePost).delete(deletePost);


export default router;