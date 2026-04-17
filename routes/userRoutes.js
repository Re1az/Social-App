import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { profile, userProfile } from '../controllers/userControllers.js';

const router=express.Router();

router.route('/profile').get(isAuth,profile);
router.route('/:id').get(isAuth,userProfile);

export default router;
