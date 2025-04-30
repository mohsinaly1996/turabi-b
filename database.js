import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const mon = await mongoose.connect(process.env.MONGO);
    console.log("dbconnected");
  } catch (error) {
    console.log(error.message); 
  }
};
