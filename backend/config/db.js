import mongoose from "mongoose";
import { MONGODB_URI } from "./server-config.js";

export const connectDB=async ()=>{
    try {
        await mongoose.connect(MONGODB_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('DB connected');
    } catch (error) {
        console.log('DB is not connected');
        console.log(error);
    }
}
