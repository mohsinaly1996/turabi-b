import express from "express";
import dotenv from "dotenv";
import {connectDB} from "./database.js";
import { authRoutes } from "./routes/authRoutes.js";


const app = express();
dotenv.config();
connectDB();
app.use(express.json())

app.use("/auth",authRoutes)



app.listen(process.env.PORT, () => {
  console.log("port is 3000");
});
