import express from 'express';
import { addPost, getAllPosts, getsinglePost, updatePost, deletePost, getPostByLanguage, getsinglePostById } from '../controller/blogController.js';

export const blogRoutes = express.Router();

blogRoutes.get("/", getAllPosts)
blogRoutes.get("/singlePost/:heading", getsinglePost)
blogRoutes.get("/singlePostById/:id", getsinglePostById)
blogRoutes.get("/postByLanguage/:language", getPostByLanguage)
blogRoutes.post("/", addPost)
blogRoutes.put("/:id", updatePost)
blogRoutes.delete("/:id", deletePost)