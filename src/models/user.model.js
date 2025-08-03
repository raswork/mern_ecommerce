import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username should be unique"],
        index:true,
        trim:true,
        lowercase:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email should be unique"],
        trim:true,
        
    },
    password:{
        type:String,
        required:[true,"password is required"],
    },
    avatar:{
        type:String,//cloudinary url
        default:""
    },
    role:{
        type:String,
        default:"customer"
    },
    refreshToken:{
        type:String,
    }

},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10)
    next()

})
userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=function(){
    const token=jwt.sign(
        {_id:this._id,
        email:this.email,
        username:this.username},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:process.env.ACCESS_TOKEN_expiry}
    )
    return token
}
userSchema.methods.generateRefreshToken=function(){
    const token=jwt.sign(
        {_id:this._id,
        email:this.email,
        username:this.username},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn:process.env.REFRESH_TOKEN_expiry}
    )
    return token
}



export const User=mongoose.model("User",userSchema)