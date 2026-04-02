import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import { errorHandler } from "../utilities/errorHandler.utility.js";
import env from "../config/env.js";
import jwt from 'jsonwebtoken'

export const isAuthenticated = asyncHandler(async(req, res, next) =>{
    const authHeader = req.headers.authorization || "";
    const bearerToken = authHeader.startsWith("Bearer ")
        ? authHeader.slice(7).trim()
        : null;

    const cookieHeader = req.headers.cookie || "";
    const cookieToken = cookieHeader
        .split(";")
        .map((part) => part.trim())
        .find((part) => part.startsWith("token="))
        ?.split("=")[1];

    const token = bearerToken || cookieToken;

    if(!token){
        return next(new errorHandler("Session expired", 401));
    }
    
    const tokenData = jwt.verify(token, env.JWT_SECRET);

    req.user = {
        ...tokenData,
        id: tokenData.id || tokenData._id,
        _id: tokenData._id || tokenData.id,
    };

    next();
});