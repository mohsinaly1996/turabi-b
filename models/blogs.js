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
        referenceImage1: {
            type: String,
            trim: true,
        },
        referenceText1: {
            type: String,
            trim: true,
        },
        referenceImage2: {
            type: String,
            trim: true,
        },
        referenceText2: {
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