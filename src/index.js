import 'dotenv/config'
import { app } from "./app.js";
import {connectDB} from './db/connectDB.js'



connectDB().then(()=>{
    app.listen(8000,()=>{
        console.log("db connected and server running")})
}
)
.catch((err)=>{
    console.log("error in mongodb connection",err);
    process.exit(1)
})