import Seller from "../models/seller.model";
import { asyncHandler } from "../utility/asynchHandler";
import { ApiResponse } from "../utility/apiResponse";
import { ApiError } from "../utility/errorResponse";

export const createSeller =asyncHandler(async(req,res)=>{
    const {storeName,storeDescription}=req.body

    if(!storeName){
        res.status(400,null,"store name is required")
    }
    const existing=await Seller.findOne({user:req.user._id})
    if(existing){
        res.status(200)
           .json(new ApiResponse(200,null,"seller already exists"))
    }
    const seller=await Seller.create({
        user:req.user._id,
        storeName,
        storeDescription,
        products:[]
    })
    return res.status(201)
             .json(new ApiResponse(201,seller,"seller created"))

})

export const sellerProfile = asyncHandler(async(req,res)=>{
    const seller = await Seller.findOne({
        user:req.user._id
    }).populate("products","name price imageUrl")

    if(!seller){
        res.status(404).json(new ApiResponse(404,null,"seller not found"))
    }

    return res.status(200).json(new ApiResponse(200,seller,"seller profile fetched"))
})


export const sellerProfileById = asyncHandler(async(req,res)=>{
    const seller = await Seller.findById(req.param.id)
    .populate("products","name price imageUrl")

    if(!seller){
        res.status(404).json(new ApiResponse(404,null,"seller not found"))
    }

    return res.status(200).json(new ApiResponse(200,seller,"seller profile fetched"))
})

export const deleteSeller = asyncHandler(async(req,res)=>{
    const seller = await Seller.findOneAndDelete({
        user:req.user._id
    })
    if(!seller){
        res.status(404).json(new ApiResponse(404,null,"seller not found"))
    }
    return res.status(200)
             .json(new ApiResponse(200,null,"seller profile deleted"))

})




