import express from 'express'

import { createTweet,getAllTweets,getAllTweetsOfUser,getTweet } from '../../controller/tweet-controller.js';
import toggleLike from '../../controller/like-controller.js';
import createComment from '../../controller/comment-controller.js';
import { deleteUser, forget, getUser, loginUser,registerUser, updateUser, verifyOtp,resetPassword } from '../../controller/user-controller.js'
import {createCrop, deleteCrop, getAllCrops, getCrop, updateCrop,upload} from '../../controller/crop-controller.js'
import { create, destroy, get, update } from '../../controller/seller-controller.js';
import {createTransaction, getLast10Transactions} from '../../controller/transaction-controller.js'
import { addToCart, getCart, removeFromCart } from '../../controller/cart-controller.js';

const router=express.Router();

//user routes
router.post('/user/signin',loginUser);
router.post('/user/signup',registerUser);
router.post('/user/forget',forget);
router.post('/user/verify',verifyOtp);
router.post('/user/resetPassword',resetPassword)
router.get('/user/:id',getUser);
router.delete('/user/:id',deleteUser);
router.patch('/user/:id',updateUser);

//discussion routes
router.post('/tweets',createTweet);
router.get('/tweets/:id',getTweet);
router.get('/mytweets/:id',getAllTweetsOfUser);
router.get('/tweets',getAllTweets); 
router.post('/likes/toggle',toggleLike);
router.post('/comments',createComment);

//crop routes
router.post('/crops',upload.array('images', 6),createCrop);
router.get('/crops',getAllCrops);
router.delete('/crops/:id',deleteCrop);
router.patch('/crops/:id',updateCrop);      //localhost:3000/api/v1/crops/66d6204b7e43fbe262bc6d67
router.get('/crops/:id',getCrop);

//seller routes
router.post('/seller',create);
router.get('/seller/:id',get);
router.delete('/seller/:id',destroy);
router.patch('/seller/:id',update);

//transaction routes
router.post('/transaction',createTransaction);
router.get('/transaction/last-10',getLast10Transactions);

//cartData routes
router.post('/cart/add',addToCart);
router.post('/cart/remove',removeFromCart);
router.post('/cart/get',getCart)


export default router;