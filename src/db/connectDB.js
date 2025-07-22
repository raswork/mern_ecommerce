import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        const connection=await mongoose.connect(`${process.env.MONGOURI}/${DB_NAME}`)
        console.log(connection)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
export {connectDB}