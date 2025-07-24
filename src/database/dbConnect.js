import mongoose from 'mongoose'

const dbConnect=async () => {

    try {
       const connection= await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
       console.log(connection)
       

    } catch (error) {
        console.log("error in dbConnect",error)
        process.exit(1)
    }
    
}

export default dbConnect