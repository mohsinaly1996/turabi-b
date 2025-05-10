import mongoose from "mongoose";
const blogs = mongoose.Schema(
    {
        heading:{
            type:String,
            required:[true,"enter heading"]
        },
        text1: {
            type: String,
            required: [true, "Enter Valid Name"],
            trim: true,
        },
        text2: {
            type: String,
            required: [true, "Enter Valid Name"],
            trim: true,
        },
        postURL: {
            type: String,
            required: [true, "Enter Valid userName"],
            trim: true,
        },
        referenceImage: {
            type: String,
            trim: true,
        },
        referenceText: {
            type: String,
            trim: true,
        },
        language:{
            type: String,
            required:true,
            trim:true
        }
    },
    { timeStamps: true }
);
export default mongoose.model("blogs", blogs);