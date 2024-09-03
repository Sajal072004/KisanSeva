import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        default:0
    },
    isSeller: {
        type: Boolean,
        default: false
    },
    sellerInfo: {
        accountNo: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^\d{10,18}$/.test(v);  // Validates account number format
                },
                message: props => `${props.value} is not a valid account number!`
            },
        },
        ifscCode: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v);  // Example IFSC code validation
                },
                message: props => `${props.value} is not a valid IFSC code!`
            },
        },
        bankName: {
            type: String,
        },
    },
    
    
},{timestamps:true});

const userModel=mongoose.models.User || mongoose.model("User",userSchema);

export default userModel;