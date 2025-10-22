import mongoose from "mongoose";

const cartSchema=new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            unique:true,
            required:true
        },
        cartItems:[{
            product:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
            quantity:{
                type:Number,required:true,default:1
            },
            price:{type:Number}
        }]
    },
    {timestamps:true}
)

const Cart=mongoose.model('Cart',cartSchema)
export default Cart