import {asyncHandler} from './utils/asyncHandler.js'
import {User} from "../model/user.model.js"
import { ApiError } from '../utils/errorResponse.js'
import { uploadCloudinary } from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/apiResponse.js'

export const registerUser=asyncHandler(async(req,res)=>{
    const{username,email,password}=req.body
    console.log(username)
    // validation
    if(
        [username,email,password].some((field) =>field?.trim()===""))
    {
        throw new ApiError(400,"All fields are required")
    }
    const existing_user=User.findOne({
        $or:[{username},{email}]
    })
    if(existing_user){
        throw new ApiError(409,"user already exists with same email or username")
    }
    console.log(req.files)
    const avatarLocalPath=req.files?.avatar[0]?.path
    const coverImageLocalPath=req.files?.coverImage[0]?.path

    if(!avatarLocalPath){throw new ApiError(400,"avatar is required")}

    const avatar = await uploadCloudinary(avatarLocalPath) //this reason to start the function with async despite the asynchandler to intentionally await 
    const coverImage=await uploadCloudinary(coverImageLocalPath) 
    if(!avatar){throw new ApiError(400,"avatar is required")}


    const user= await User.create({
        username:username.tolowercase(),
        email,
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url || ""

    })

    const createdUser=await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){throw new ApiError(500,"went wrong")}

    return res.status(201).json(
        new ApiResponse(200,createdUser,"user created ")
    )

} )


