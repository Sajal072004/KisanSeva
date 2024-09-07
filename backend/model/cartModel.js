import mongoose from "mongoose";

const cartDataSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [
        {
        cropId: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Crop', 
            required: true 
        },
        quantity: { 
            type: Number, 
            required: true 
        },
        price: { 
            type: Number, 
            required: true 
        }, 
        total: {                // total cost of that item
            type: Number, 
            required: true 
        }, 
    }], 
    totalAmount: {      //total cost of whole cart
        type: Number, 
        required: true, 
        default: 0 
    }
},{timestamps:true});

const CartData = mongoose.model('CartData', cartDataSchema);

export default CartData;
