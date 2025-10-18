import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
const app=express()
app.use(cookieParser())

app.use(cors({
    origin:'*',
    credentials:true
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))




app.use("/users",userRouter)
app.use("/products",productRouter)

export default app
