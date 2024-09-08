import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        default: 0
    },
    isSeller: {
        type: Boolean,
        default: false // true if the user is a seller
    },
    totalEarned: { // Tracks total earnings for sellers
        type: Number,
        default: 0
    },
    totalSpent: { // Tracks total money spent for buyers
        type: Number,
        default: 0
    },
    cartData:{
        type:Object,
        default:{}
    }
    
}, { timestamps: true });

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
