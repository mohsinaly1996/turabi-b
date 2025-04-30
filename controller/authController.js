import {response} from "express";
import users from "../models/user.js";
import {genSalt, hash, compare} from "bcrypt";
import { reply } from "../responses.js";

//Sign Up
export async function signupController(req, res) {
  try {
    const {name, userName, email, password, phone} = req.body;

    if (!name || !userName || !email || !password || !phone) {
      reply(500, false, "All Field are mandatory");
    }
    const salt = await genSalt(12);
    const doc = new users({
      name: name,
      userName: userName,
      email: email,
      phone: phone,
      password: await hash(password, salt),
    });
    await doc.save();
    // reply(200,true,"Signup Successfully")
    return res.status(200).json({
      status: true,
      message: "Signup Successfully",
    });
  } catch (error) {
    console.log(error.message);
  }
}
//Sign In
export async function signinController(req, res) {
  try{
    const {email, password} = req.body;
    if (!email || !password) {
      reply(500,false,"All fields are mandatory");
    }
    const userData = await users.find({email: email});
    if (!userData) {
      reply(500, false, "Email and Password is not correct");
    }
    const check = await compare(password, userData[0]?.password);
    if (!check) {
      reply(500,false,"Invalid Username or Password");
    }
    return res.status(200).json({
      status: true,
      message: "Login Successfully",
    });
  }
  catch(error){
    console.log(error.message);
  }
  }
  
  
