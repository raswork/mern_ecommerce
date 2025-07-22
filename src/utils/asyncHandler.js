const asyncHandler=(func)=>{
    return (req,res,next) =>{
        Promise.resolve(func(req,res,next))
        .catch((err)=>next(err))
    }
}
export {asyncHandler}

/*
const asyncHandler=(fxn)=>async(req,res,next)=>
    {
     try{
        await fxn(req,res,next)
        }
    catch(err){res.status(err.code||500).json({sucess:false,message:err.message})}
    } 
*/