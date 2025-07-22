import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'

cloudinary.config(
    {
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    }
)

const uploadCloudinary=async (localfilepath)=>{
    try {
        if(!localfilepath) return 
        const res=await cloudinary.uploader.upload(localfilepath,{
            resource_type:"auto"
        })
        console.log("file uploaded on cloudinary",res);
        return res.url
        
    } catch (error) {
        fs.unlinkSync(localfilepath)
        return null;
    }

}

export {uploadCloudinary}
