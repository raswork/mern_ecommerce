import jwt from 'jsonwebtoken'
import { asyncHandler } from '../utility/asynchHandler.js'
import { ApiError } from '../utility/errorResponse.js'
import {User} from "../models/user.model.js"

export const verifyjwt=asyncHandler(async(req,res,next)=>{
    try {
        const token=await req.cookies?.accessToken ||
                    req.header("Authorization")?.replace("Bearer","")
    
        console.log(token || "no token found")
        if (!token) {throw new  ApiError(400,"token not found")}
    
        const decodedToken= jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        if(!decodedToken) throw new ApiError(400,"unauthorized request")
    
        const user=await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user) throw new ApiError(401,"unauthorized request")
        req.user=user
        next()
    } catch (error) {
        throw new ApiError(401,error?.message || "Invalid request")
        
    }
})