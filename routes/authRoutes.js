import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/authControllers.js";
import uploadFile from "../middleware/multer.js";

const router=express.Router();

router.route('/register').post(uploadFile,registerUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logoutUser);

export default  router;