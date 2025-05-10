import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./Utils/database.js";
import { authRoutes } from "./routes/authRoutes.js";
import { blogRoutes } from "./routes/blogRoutes.js";
import cors from "cors"


const app = express();
dotenv.config();
connectDB();
app.use(express.json())
app.use(cors())

app.use("/auth",authRoutes)
app.use("/blog",blogRoutes)



app.listen(process.env.PORT, () => {
  console.log("port is 3000");
});
