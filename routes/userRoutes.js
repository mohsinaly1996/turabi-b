import express from 'express';
import { getSingleUser } from '../controller/userController.js';

export const userRoutes = express.Router();

userRoutes.get("/:email", getSingleUser)