import express from 'express';
import { signinController, signupController } from '../controller/authController.js';
export const authRoutes = express.Router();

authRoutes.post("/signup",signupController)
authRoutes.post("/signin",signinController)