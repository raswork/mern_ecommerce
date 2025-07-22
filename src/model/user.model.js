import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            index:true,
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        avatar:{
            type:String,
            required:true
        },
        coverImage:{
            type:String,
        },
        refreshToken:{
            type:String
        }
        ,
        watchHistory:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Video"
            }
        ]
    },
    
    {timestamps:true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()
}) 

userSchema.methods.checkPassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    const accessToken =jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_expiry}
)
    return accessToken
}
userSchema.methods.generateRefreshToken=function(){
    const refreshToken =jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_expiry}
)
    return refreshToken
}



export const User=mongoose.model("User",userSchema)