import dotenv from 'dotenv'
import app from './app.js'
import dbConnect from './database/dbConnect.js'

dotenv.config({
    path:'./src/.env'
})


dbConnect().then(
    app.listen(process.env.PORT||8000,()=>{
        console.log("connected to database");
        
    })
)
