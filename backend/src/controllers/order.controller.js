import Order from '../models/order.model.js'
import { asyncHandler } from "../utility/asynchHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { ApiError } from "../utility/errorResponse.js";

export const createOrder=asyncHandler(async(req,res)=>{
    const {orderItems,shippingAddress,paymentMethod} =req.body
    
    if(!orderItems  || !shippingAddress || !paymentMethod){
        return res.status(400).
        json(new ApiResponse(400,null,"all fields are required"))
    }
    const order = await Order.create({
        user:req.user._id,
        orderItems,
        shippingAddress,
        paymentMethod
    })
    return res.status(201)
              .json(new ApiResponse(201,order,"order created"))

})

export const getAllOrders=asyncHandler(async(req,res)=>{
    const orders=await Order.find({user:req.user._id})
    return res.status(201)
              .json(new ApiResponse(201,orders,"user orders fetched"))
})

export const getOrderById=asyncHandler(async(req,res)=>{
    const order=Order.findById(req.params._id)
                    . populate('user','name email')
                    . populate('orderItems.productId','name price')
    if(!order){
        return res.status(400)
              .json(new ApiResponse(400,null,"order not found")
      )}
    return res.status(201)
              .json(new ApiResponse(200,order,"order fetched"))
})

export const updateOrder=asyncHandler(async(req,res)=>{
    const order=await Order.findById(req.params.id)
    if(!order){
        return res.status(400)
              .json(new ApiResponse(400,null,"order not found")
      )}

    //payment update comes from payment gateaway callback or admin action
    if(req.body.isPaid === true){
        order.isPaid =true
        order.paidAt=new Date()
    }

    // delivery update come from courier/ops or admin dashboard
    if(req.body.isDelivered === true){
        order.isDelivered =true;
        order.deliveredAt =new Date()
    }

    const allowedStatues=['pending','confirmed','processing']
    const{orderStatus} = req.body

    if(orderStatus){
        if(!allowedStatues.includes(orderStatus)){
            return res.status(400).json(
                new ApiResponse(400,null,"invalid response")
            )

        }
    }

    await order.save()
    return res.status(200).json(new ApiResponse(200,order,"order updated"))


})