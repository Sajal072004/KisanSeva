import mongoose from 'mongoose'

const cropSchema=new mongoose.Schema({
    //crop Id will be automatic generated
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,   
    },
    image:{
        type:[String],
    },
    price:{
        type:Number,
        required:true,
        min:0
    },
    quantity:{
        type:Number,
        required:true,
        min:0
    },
    unit:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
    },

    status:{
        type:String,
        enum:['InStock','OutOfStock','Expired'],
        default:'InStock',
    },

    harvestDate:{
        type:Date,
        required:true
    },

    expiryDate:{
        type:Date,
        required:true
    },
    Location:{
        type:String,
        required:true,
    },
    userId:{                //Seller's userId
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

},{timestamps:true});

cropSchema.methods.isExpired = function () {
    return this.expiryDate < new Date();
};


const Crop=mongoose.model('Crop',cropSchema);

export default Crop;