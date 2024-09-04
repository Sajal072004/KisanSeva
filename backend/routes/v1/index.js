import express from 'express'

import { createTweet,getAllTweetsOfUser,getTweet } from '../../controller/tweet-controller.js';
import toggleLike from '../../controller/like-controller.js';
import createComment from '../../controller/comment-controller.js';
import { forget, loginUser,registerUser, verify } from '../../controller/user-controller.js'
import {createCrop, deleteCrop, getAllCrops, getCrop, updateCrop} from '../../controller/crop-controller.js'
import { create, destroy, get, update } from '../../controller/seller-controller.js';

const router=express.Router();

router.post('/user/signin',loginUser);
router.post('/user/signup',registerUser);
router.post('/user/forget',forget);
router.post('/user/verify',verify);

router.post('/tweets',createTweet);
router.get('/tweets/:id',getTweet);
router.get('/mytweets/:id',getAllTweetsOfUser);

router.post('/likes/toggle',toggleLike);

router.post('/comments',createComment);

router.post('/crops',createCrop);
router.get('/crops',getAllCrops);
router.delete('/crops/:id',deleteCrop);
router.patch('/crops/:id',updateCrop);      //localhost:3000/api/v1/crops/66d6204b7e43fbe262bc6d67
router.get('/crops/:id',getCrop);


router.post('/seller',create);
router.get('/seller/:id',get);
router.delete('/seller/:id',destroy);
router.patch('/seller/:id',update);



export default router;