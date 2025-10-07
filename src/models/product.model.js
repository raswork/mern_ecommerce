import {mongoose,Schema} from 'mongoose'

const productSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
    },
    images:[{type:String}],
    sizes:[{type:String}],
    colors:[{type:String}],
    seller:{
        type:Schema.Types.ObjectId,
        ref:'Seller',
        required:true
    }

})

const Product=mongoose.model("Product",productSchema)

export default Product
