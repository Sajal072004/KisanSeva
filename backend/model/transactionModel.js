import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    cropId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Crop'
    },
    quantity:{
        type:Number,
        required:true    
    },
    price:{
        type:Number,
        required:true
    },
    transactionType:{
        type:String,
        enum:['purchase','sale']
    },
    totalAmount:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})

const Transaction= mongoose.model('Transaction',transactionSchema);

export default Transaction;