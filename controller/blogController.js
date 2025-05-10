import blogs from "../models/blogs.js";
import { errorHandler, successHandler } from "../Utils/responses.js";

export async function getAllPosts(req, res) {
    try {
        const getAll = await blogs.find();
        if (getAll.length == 0) {
            return errorHandler(res, 400, "No Post avaliable");
        }
        else if (getAll) {
            return successHandler(res, 200, "data found", getAll, getAll.length)
        }
    }
    catch (error) {
        errorHandler(res, 500, error);
    }
}

export async function getsinglePost(req, res) {
    const findText = req.params.heading;

    if (!findText || findText.trim() === "") {
        return errorHandler(res, 400, "Invalid input");
    }

    const blog = await blogs.find({
        heading: { $regex: findText, $options: "i" }
    });

    if (blog.length === 0) {
        return errorHandler(res, 404, "No matching blogs found");
    }

    return successHandler(res, 200, "Blogs found", blog, blog.length);
}

export async function addPost(req, res) {
    try {
        const { heading, text, postURL, reference } = req.body;
        if (!heading || !text || !postURL) {
            return errorHandler(res, 400, "Missing Feilds");
        }
        const blog = new blogs({
            heading: heading,
            text: text,
            postURL: postURL,
            reference: reference
        })
        const isSaved = await blog.save()
        if (!isSaved) {
            return errorHandler(res, 500, "Something Worng")
        }
        return successHandler(res, 200, "User added successfully");
    }
    catch (error) {
        return errorHandler(res, 500, error);
    }
}

export async function updatePost(req, res) {
    const id = req.params.id;
    if (!id) {
        return errorHandler(res, 400, "Missing Feilds");
    }
    const { heading, text, postURL, reference } = req.body;
    if (!heading || !text || !postURL) {
        return errorHandler(res, 400, "Missing Feilds");
    }
    const blog = await blogs.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                heading: heading,
                text: text,
                postURL: postURL,
                reference: reference
            },
        },
        { new: true }
    )
    if (!blog) {
        return errorHandler(res, 500, "Invalid post Id")
    }
    return successHandler(res, 200, "Updated successfully", blog);
}

export async function deletePost(req, res) {
    const id = req.params.id;
    const blog = await blogs.findOneAndDelete({ _id: id })
    if (!blog) {
        return errorHandler(res, 500, "No Post found");
    }
    return successHandler(res, 200, "deleted successfully", blog);
}