import express from "express";
import { registerUser } from "../controllers/authControllers.js";
import uploadFile from "../middleware/multer.js";

const router=express.Router();

router.route('/register').post(uploadFile,registerUser);

export default  router;