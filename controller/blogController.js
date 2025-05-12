import blogs from "../models/blogs.js";
import { errorHandler, successHandler } from "../Utils/responses.js";

export async function getAllPosts(req, res) {
    try {
        const getAll = await blogs.find();
        if (getAll.length == 0) {
            return errorHandler(res, 200, "No Post avaliable");
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
        return errorHandler(res, 200, "No matching blogs found");
    }

    return successHandler(res, 200, "Blogs found", blog, blog.length);
}

export async function getsinglePostById(req, res) {
    const id = req.params.id;

    if (!id) {
        return errorHandler(res, 400, "Invalid input");
    }

    const blog = await blogs.findOne({ _id: id });

    if (!blog) {
        return errorHandler(res, 200, "No matching blogs found");
    }

    return successHandler(res, 200, "Blogs found", blog, blog.length);
}

export async function addPost(req, res) {
    try {
        const { heading, text1, text2, referenceImage1, referenceImage2, referenceText1, referenceText2, language } = req.body;
        if (!heading || !text1 || !text2 || !language) {
            return errorHandler(res, 400, "Missing Feilds");
        }
        const blog = new blogs({
            heading: heading,
            text1: text1,
            text2: text2,
            referenceImage1: referenceImage1 || "",
            referenceImage2: referenceImage2 || "",
            referenceText1: referenceText1 || "",
            referenceText2: referenceText2 || "",
            language: language
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
    const { heading, text1, text2, referenceImage1, referenceImage2, referenceText1, referenceText2, language } = req.body;
    if (!heading || !text1 || !text2 || !language) {
        return errorHandler(res, 400, "Missing Feilds");
    }
    const blog = await blogs.findOneAndUpdate(
        { _id: id },
        {
            $set: {
                heading: heading,
                text1: text1,
                text2: text2,
                referenceImage1: referenceImage1 || "",
                referenceImage2: referenceImage2 || "",
                referenceText1: referenceText1 || "",
                referenceText2: referenceText2 || "",
                language: language
            },
        },
        { new: true }
    )
    if (!blog) {
        return errorHandler(res, 500, "Invalid post Id")
    }
    return successHandler(res, 200, "Updated successfully", blog);
}

export async function getPostByLanguage(req, res) {
    const language = req.params.language;
    if (!language) {
        return errorHandler(res, 400, "Missing Feilds");
    }
    try {
        const blog = await blogs.find({ language: language });

        if (blog.lenght == 0) {
            return errorHandler(res, 200, "No matching blogs found");
        }

        return successHandler(res, 200, "Blogs found", blog, blog.length);
    }
    catch(e){
        return errorHandler(res, 500, e);
    }
}

export async function deletePost(req, res) {
    const id = req.params.id;
    const blog = await blogs.findOneAndDelete({ _id: id })
    if (!blog) {
        return errorHandler(res, 500, "No Post found");
    }
    return successHandler(res, 200, "deleted successfully", blog);
}