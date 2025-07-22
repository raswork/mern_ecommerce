import mongoose,{Schema} from 'mongoose'
import mongooseAggregatedPaginate from "mongoose-aggregate-paginate-v2"

const videoSchema=new Schema({
    videoFile:{
        type:String, // cloudinary url
        required:true
    },
    thumbnail:{
        type:String, // cloudinary url
        required:true
    },
    title:{
        type:String, 
        required:true
    },
    description:{
        type:String, 
        required:true
    },
    duration:{
        type:Number, // cloudinary jb upload krta ha to deta han
        required:true
        
    },
    views:{
        type:Number, 
        default:0
    },
    isPublished:{
        type:Boolean, 
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:User, 
      
    },


},{timestamps:true})

videoSchema.plugin(mongooseAggregatedPaginate)

export const Video=mongoose.model("Video",videoSchema)