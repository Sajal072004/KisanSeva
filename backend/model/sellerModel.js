import mongoose from "mongoose";

const sellerSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    accountNo:{
        type:String,
        required:true,
        unique:true
    },
    ifscCode:{
        type:String,
        required:true,
    },
    bank:{
        type:String,
        required:true,
    }
},{timestamps:true})

const Seller= mongoose.model('Seller',sellerSchema);

export default Seller;