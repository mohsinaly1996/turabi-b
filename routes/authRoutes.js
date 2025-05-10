import express from 'express';
import { signinController, signupController, verifyToken } from '../controller/authController.js';

export const authRoutes = express.Router();

authRoutes.post("/signup", signupController)
authRoutes.post("/signin", signinController)
authRoutes.get('/JWTVerify/:token',verifyToken);