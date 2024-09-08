import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({                   //ek tarah se order model
    buyerId: { // Renamed from userId to buyerId for clarity
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        cropId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Crop',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        },
    }],
    transactionType:{
        type:String,
        enum:['purchase','sale'],
        default:'purchase'
    },
    totalAmount:{
        type:Number,
    },
    payment:{
        type:Boolean,
        default:false,
    },
    paymentMethod: {
        type: String,
        enum: ['stripe', 'paypal', 'cash'],
        default: 'stripe'
    },
    address:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})

const Transaction= mongoose.model('Transaction',transactionSchema);

export default Transaction;