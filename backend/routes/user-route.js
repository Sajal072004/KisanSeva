import express from 'express'
import { Router } from 'express'
import { forget, loginUser,registerUser, verify } from '../controller/user-controller.js';

const userRoutes=express.Router();


userRoutes.post('/signin',loginUser);
userRoutes.post('/signup',registerUser);
userRoutes.post('/forget',forget);
userRoutes.post('/verify',verify);

export default userRoutes;
