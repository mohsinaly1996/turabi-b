import user from "../models/user.js";
import { errorHandler, successHandler } from "../Utils/responses.js";

export const getSingleUser = async (req, res) => {
    const email = req.params.email;
    try {
        const userData = await user.findOne({ email: email });
        if (!userData) {
            return errorHandler(res, 404, "No such user Found");
        }
        return successHandler(res, 200, "user found", userData, 1)
    }
    catch (e) {
        return errorHandler(res, 500, "SomeThing went wrong");
    }
}