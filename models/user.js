import mongoose from "mongoose";

const users = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter Valid Name"],
      minlength: 3,
      maxlength: 25,
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "Enter Valid userName"],
      minlength: 3,
      maxlength: 25,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Enter Valid Password"],
      minlength: 5,
    },
    email: {
      type: String,
      required: [true, "Enter Valid Email"],
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "Enter Valid Phone Number"],
      unique: true,
    },
    admin: {
      type: Boolean,
      required: [true],
      default: false,
    }
  },
  { timestamps: true }
);

export default mongoose.model("users", users);
