import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { followandunfollowUser, myProfile, updatePassword, updateProfile, userFollowersandFollowingData, userProfile } from '../controllers/userControllers.js';
import uploadFile from '../middleware/multer.js';

const router=express.Router();

router.route('/me').get(isAuth,myProfile);
router.route('/:id').get(isAuth,userProfile).put(isAuth,uploadFile,updateProfile).post(isAuth,updatePassword);
router.route('/follow/:id').post(isAuth,followandunfollowUser);
router.route('/followdata/:id').get(isAuth,userFollowersandFollowingData);

export default router;
