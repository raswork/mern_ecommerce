import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary=async(localpath)=>{
    try {
        if(!localpath)  return null
        const res =await cloudinary.uploader.upload(localpath,{
            resource_type:"auto"
        })
        console.log("file uploaded",res)
        console.log(res.url)
        fs.unlinkSync(localpath)
        return res
        
    } catch (error) {
        console.log("cloudinary failed",err)
        fs.unlinkSync(localpath)
        return null
    }
}
export {uploadOnCloudinary}