import users from "../models/user.js";
import { genSalt, hash, compare } from "bcrypt";
import { successHandler, errorHandler } from '../Utils/responses.js'
import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//Sign Up
export async function signupController(req, res) {
  try {
    const { name, userName, email, password, phone } = req.body;

    if (!name || !userName || !email || !password || !phone) {
      return errorHandler(res, 500, "All Field are mandatory")
    }
    if (password.length < 8) {
      return errorHandler(res, 500, "Minimum lenght of password must be 8")
    }

    const isUserNameExits = await users.findOne({ userName: userName });
    if (isUserNameExits) {
      return errorHandler(res, 500, "User Name already exists");
    }

    const isEmailExits = await users.findOne({ email: email });
    if (isEmailExits) {
      return errorHandler(res, 500, "Email already exists");
    }

    const isPhoneExits = await users.findOne({ phone: phone });
    if (isPhoneExits) {
      return errorHandler(res, 500, "Phone Number already exists");
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
    return successHandler(res, 200, "Signup Successfully");
  }
  catch (error) {
    console.log(error.message);
  }
}

//Sign In
export async function signinController(req, res) {
  try {
    const tokenJWT = req.body.params;
    const { email, password } = req.body;
    if (!email || !password) {
      return errorHandler(res, 500, "All feilds are mandatory");
    }
    const userData = await users.findOne({ email: email });
    if (!userData) {
      return errorHandler(res, 500, "InValid UserName or Password")
    }
    const isValidPassword = await compare(password, userData.password)
    if (!isValidPassword) {
      return errorHandler(res, 500, "InValid UserName or Password")
    }
    const token = JWT.sign(
      {
        _id: userData?._id,
        email: userData?.email
      },
      process.env.JWTSECRET,
      { expiresIn: '24h' }
    );
    return successHandler(res, 200, "SignIn successfully", token);
  }
  catch (error) {
    console.log(error);
  }
}

// verifyTokenJWT
export const verifyToken = (req, res) => {
  let frontEndToken = req.params.token;
  try {
    if (!frontEndToken) {
      return errorHandler(res, 404, "Token not found")
    }
    const decode = JWT.verify(frontEndToken, process.env.JWTSECRET)
    return successHandler(res, 200, "Token verified", decode);
  }
  catch (e) {
    return errorHandler(res, 400, e.message)
  }
}