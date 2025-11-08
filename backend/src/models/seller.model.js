import {mongoose,Schema }from 'mongoose'

const sellerSchema = new Schema({
    user :{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    storeName:{
        type:String,
        required:true,
    },
    storeDescription:{
        type:String
    },
    products:[{type:Schema.Types.ObjectId,ref:'Product'}]


},
    {timestamps:true})

const Seller=mongoose.model('Seller',sellerSchema)

export default Seller