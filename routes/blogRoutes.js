import express from 'express';
import { addPost, getAllPosts, getsinglePost, updatePost, deletePost } from '../controller/blogController.js';

export const blogRoutes = express.Router();

blogRoutes.get("/", getAllPosts)
blogRoutes.get("/singlePost/:heading", getsinglePost)
blogRoutes.post("/", addPost)
blogRoutes.put("/:id", updatePost)
blogRoutes.delete("/:id", deletePost)