import express from 'express'

import { createTweet,getTweet } from '../../controller/tweet-controller.js';
import toggleLike from '../../controller/like-controller.js';
import createComment from '../../controller/comment-controller.js';
import { forget, loginUser,registerUser, verify } from '../../controller/user-controller.js'

const router=express.Router();

router.post('/user/signin',loginUser);
router.post('/user/signup',registerUser);
router.post('/user/forget',forget);
router.post('/user/verify',verify);

router.post('/tweets',createTweet);
router.get('/tweets/:id',getTweet);

router.post('/likes/toggle',toggleLike);

router.post('/comments',createComment);


export default router;