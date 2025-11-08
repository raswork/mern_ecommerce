import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import orderRouter from './routes/order.routes.js'
import cartRouter from './routes/cart.routes.js'
import sellerRouter from './routes/seller.routes.js'


const app=express()
app.use(cookieParser())

app.use(cors({
    origin:'*',
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))


app.use("/api/users",userRouter)
app.use("/api/products",productRouter)
app.use("/api/orders",orderRouter)
app.use("/api/cart",cartRouter)
app.use("/api/seller",sellerRouter)

export default app
