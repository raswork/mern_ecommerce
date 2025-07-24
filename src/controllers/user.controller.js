export const registerUser=(req,res)=>{
    try {
        res.status(200).json({
            message:"route hit sucessfully"
        })
        
    } catch (err) {
        console.log("error in registor controller",err)
        process.exit(1)
        
    }


}