import mongoose from "mongoose";
const blogs = mongoose.Schema(
    {
        heading:{
            type:String,
            required:[true,"enter heading"]
        },
        text: {
            type: String,
            required: [true, "Enter Valid Name"],
            trim: true,
        },
        postURL: {
            type: String,
            required: [true, "Enter Valid userName"],
            trim: true,
        },
        reference: {
            type: String,
            trim: true,
        }
    },
    { timeStamps: true }
);
export default mongoose.model("blogs", blogs);