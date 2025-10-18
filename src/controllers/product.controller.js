import Product from "../models/product.model";
import { asyncHandler } from "../utility/asynchHandler";
import { ApiResponse } from "../utility/apiResponse";
import { ApiError } from "../utility/errorResponse";
import { uploadOnCloudinary } from "../utility/cloudinary";
import cloudinary from 'cloudinary'

export const getAllProducts =asyncHandler(async (req,res) => {
    const products= await Product.find().lean()
    // lean function only return json part from mongodb and is fast for read method
    if(!products || products.length === 0){
        return res.status(200).
                  json(new ApiResponse(200,[],"products fetched"))
    }
    res.status(200).json(new ApiResponse(200,products,"products fetched"))
})

export const getProductById = asyncHandler(async(req,res)=>{
    const productId=req.params.productId
    if(!productId){
        return res.status.json(new ApiResponse(404,null,"no productId provided"))
    }
    
    const product = await Product.findById(productId).lean()
    if(!product){
        return res.status(404).json(new ApiResponse(404,null,"no product found with the given id"))
    }
    res.status(200).json(new ApiResponse(200,product,"Product fetched"))
}
)

export const createProduct=asyncHandler(async(req,res)=>{
    const {title,description,countInStock,
        price,category,subcategory,sizes,colors}=req.body
    const seller = req.user._id
    if(!title || !description || price === undefined || !category || !subcategory || !seller || !req.file)
        {throw new ApiError(400,"you need to fill all fields")}
    let colorArray=[]
    let sizeArray=[]
    try {
        colorArray= typeof colors === 'string' ? JSON.parse(colors) : (colors || [])
        sizeArray= typeof sizes === 'string' ? JSON.parse(sizes) : (sizes || [])

        
    } catch (error) {
        {throw new ApiError(400,"color and size should be array")}
    }
    if (!req.file) { throw new ApiError(400,"you need image")}
    const imgRes = await uploadOnCloudinary(req.file.path);
    if(!imgRes || imgRes.url){
        throw new ApiError(400,"you need to fill all fields")
    }

    const images = [ {url:imgRes.url,public_id:imgRes.public_id}]

    /*
     for multiple images
     let imgArr =[]
     if (req.files && Array.isArray(req.files)){
     for (const file of req.files){
        const imgRes=await uploadOnCloudinary(file.path)
        if (imgRes && imgRes.url){
         imgArr.push({
           url:imgRes.url,
           public_id:imgRes.public_id
         })
        }
     if(imgArr.length === 0) send error
     }
     
     }
    */

    const product =await Product.create({
        title,description,price,countInStock,category,subcategory,
        colors:colorArray,
        sizes:sizeArray,
        images,
        seller
    })

    res.status(201).json(new ApiResponse(201,product,"product added "))

})

export const deleteProduct=asyncHandler(async(req,res)=> 
    {
    const {id} = req.params
    const product =await Product.findById(id)
    if(!product){throw new ApiError(400,"product not found")}
    if(String(product.seller)!== String(req.user._id)){
        throw new ApiError(403,"you are not authorized to delete this product")}
    if(product.imageId){
        await cloudinary.v2.uploader.destroy(product.imageId,{resource_type:'image'})
    }
    await Product.deleteOne();

    res.status(200).json(new ApiResponse(200,null,"product deleted"))

})