import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username should be unique"],
        index:true
    },
    email:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username should be unique"],
    },
    password:{
        type:String,
        required:[true,"username is required"],
    },
    avatar:{
        type:String,//cloudinary url
        default:""
    },
    role:{
        type:String,
        default:"customer"
    }

},{timestamps:true})

export const User=mongoose.model("User",userSchema)