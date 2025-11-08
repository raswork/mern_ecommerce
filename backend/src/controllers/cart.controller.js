import Cart from "../models/cart.model.js";

import { asyncHandler } from "../utility/asynchHandler.js";
import { ApiResponse } from "../utility/apiResponse.js";
import { ApiError } from "../utility/errorResponse.js";


export const addOrUpdateCartItems=asyncHandler(async(req,res)=>{
    const {product,quantity} = req.body
    if(!product || quantity){
        return res.status(400)
                  .json(new ApiResponse(400,null,"product and  quantity are required"))
    }
    const prod=await product.findById(product)
    if(!prod){
        return res.status(400).json(new ApiResponse(400,null,"product not found"))
    }
    let cart = await Cart.findOne({user:req.user._id})
    if(!cart){
        cart = new Cart({
            user:req.user._id,
            cartItems:[]
        })
    }
    const item=cart.cartItems
                   .find(item=>item.product.toString()===product)

    if(item){
        item.quantity += 1;
        item.price=prod.price
    }else{
        cart.cartItems.push({
            product,quantity:1,price:prod.price
        })
    }
    await cart.save()
    res.status(200
        .json(new ApiResponse(200,cart,"cart updated"))
    )
})



export const removeCartItem=asyncHandler(async(req,res)=>{
    const {product} = req.body
    let cart = await Cart.findOne({user:req.user._id})
    if(!cart){
        return res.status(404).json(new ApiResponse(404,null,"cart not found"))
    }
    cart.cartItems=cart.cartItems
    .filter(item=> item.product.toString() !== product)
    await cart.save()
    return res.status(200)
              .json(new ApiResponse(200,cart,"item removed"))

})


export const clearCart=asyncHandler(async(req,res)=>{
    let cart = await Cart.findOne({user:req.user._id})
    if(!cart){
        return res.status(404).json(new ApiResponse(404,null,"cart not found"))
    }
    cart.cartItems=[]
    await cart.save()
    return res.status(200).json(new ApiResponse(200,null,"cart cleared"))
    
})

export const getMyCart=asyncHandler(async(req,res)=>{
    const cart =await Cart.findOne({user:req.user._id})
                          . populate('cartItems.product','name price imageUrl')
    if(!cart){
        return res.status(200).json(new ApiResponse(200,{cartItems:[]},"cart empty"))
    }
    return res.status(200).json(new ApiResponse(200,cart,"cart fetched"))
})