import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { followandunfollowUser, myProfile, userFollowersandFollowingData, userProfile } from '../controllers/userControllers.js';

const router=express.Router();

router.route('/me').get(isAuth,myProfile);
router.route('/:id').get(isAuth,userProfile);
router.route('/follow/:id').post(isAuth,followandunfollowUser);
router.route('/followdata/:id').get(isAuth,userFollowersandFollowingData);

export default router;
