import mongoose,{Schema} from 'mongoose'


const orderItemSchema=new Schema({
    productId:{type:Schema.Types.ObjectId,ref:'Product'},
    quantity:{type:Number,required:true},
    size:{type:String},
    color:{type:String},
    price:{type:Number,required:true},
    imageUrl:String
})

const orderSchema=new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:User
    },
    orderItems:[orderItemSchema],
    shippingAddress:{
        name:{type:String,required:true},
        address:{type:String,required:true},
        city:{type:String,required:true},
        state:{type:String,required:true},
        pincode:{type:String,required:true},
        phone:{type:String,required:true}
    },
    isPaid:{type:Boolean,default:false},
    paidAt:Date,
    isDelivered:{type:Boolean,default:false},
    deliveredAt:Date,
    paymentMethod:String,
    
    orderStatus:{
        type:String,
        enum:['pending','confirmed','processing'],
        default:'pending'
    }
},{timestamps:true})

const Order=mongoose.model("Order",orderSchema)
export default Order