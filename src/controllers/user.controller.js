import { asyncHandler } from "../utility/asynchHandler.js"
import {User} from "../models/user.model.js";
import {ApiResponse} from "../utility/apiResponse.js"
import {ApiError} from "../utility/errorResponse.js"
import {uploadOnCloudinary} from "../utility/cloudinary.js"

export const generateTokens=async(id)=>{
    const user=await User.findById(id)
    const access=user.generateAccessToken()
    const refresh=user.generateRefreshToken()
    user.refreshToken=refresh
    await user.save({validateBeforeSave:false})
    return {access,refresh}
}

const options={httpOnly:true,secure:true}


export const registerUser=asyncHandler(async(req,res)=>{
    try {
        const {username,email,password}=req.body
        console.log(username);
        //add more validations
        if([username,email,password].
            some((field)=>field?.trim()===""))
            {throw new ApiError(400,"you need to fill all fields")}

        const check_user=await User.findOne({
            $or:[{username},{email}]
        })
        if (check_user) {throw new ApiError(409,"user already exists")}

        console.log(req.file?.avatar || "avatar nhi hai");

        // let avatar;
        // if (!req.file.avatar) {avatar=""}
        // const avatar_path=req.files?.avatar[0]?.path
        // avatar=uploadOnCloudinary(avatar_path)
        /*let avatarPath;
        if(req.files && Array.isArray(req.file.Avatar) && req.file.Avatar.length>0){
        avatarPath=req.files.Avatar[0].path
        console.log(avatarPath)

        }*/
      

        const user=await User.create({
            email,
            password,
            username:username.toLowerCase(),
            
        })
        const created_user=await User.findById(user._id).select("-password ") 
        
        return res.status(200)
                   .json(new ApiResponse(200,created_user,"user created successfully"))
    } catch (err) {
        console.log("error in register controller",err)
        process.exit(1)
    }
})

export const loginUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    console.log(username || email)
    if(!(username || email)){
        throw new ApiError(400,"provide username or email")
    }
    if([username,email,password].some((field)=>field?.trim()===""))
        {
        throw new ApiError(400,"you need to fill all fields")
        }

    const user=await User.findOne({
        $or:[{username},{email}]
    })
    if(!user) {throw new ApiError(400,"user not found")}

    const check_password=await user.isPasswordCorrect(password)

    if(!check_password) {throw new ApiError(400,"wrong creditials")}

    const {access,refresh}=await generateTokens(user._id) 
    
    const loggedUser=await User.findById(user._id).select("-password -refreshToken")
    
    return res.status(200)
               .cookie("accessToken",access,options)
               .cookie("refreshToken",refresh,options)
               .json(new ApiResponse(
                200,{user:loggedUser,access,refresh},
                "user created sucessfully"
               ))

})

//update later

export const logoutUser= asyncHandler(async(req,res)=>{
    
    await User.findByIdAndUpdate(req.user?._id,{
        $unset:{refreshToken:1}},
        {new:true}
    )
        
    return res.clearcookie("accessToken",options)
              .clearcookie("refreshToken",options)
              .json(new ApiResponse(200,{},"logged out"))
})

export const refreshAccessToken=asyncHandler(async(req,res)=>{
    const token=req.cookies.refreshToken || req.body.refreshToken
    if(!token) {throw new ApiError(401,"unauthorized request") }
   try {
     
     const check_token=jwt.verify(token,process.env.REFRESH_TOKEN_SECRET)
     const user=await User.findById(check_token?._id)
     if(!user) throw new ApiError(400,"Invalid token")
    
     if(check_token !== user?.refreshToken) {throw new ApiError(401,"token expired .please login again")}
     const {access,refresh} =await generateTokens(user._id)

     return res.status(200)
                .cookie("accessToken",access,options)
                .cookie("refreshToken",refresh,options)
                .json(new ApiResponse(
                 200,{},
                 "token refreshed sucessfully"
                ))
   } catch (error) {
    throw new ApiError(401,error?.message || "unauthorized request")
    
   }
})

