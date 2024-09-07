import mongoose from "mongoose";

const tweetSchema=new  mongoose.Schema({
    userId:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true,
        
    },
    
    title:{
        type:String,
        required:true,
        max:[150,"Title can't be more than 150 characters"]
    },

    
    likes:[{                                     //A tweet can have many likes   
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }
    ],
    comments:[                                   //comments for tweets
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true
})  

const Tweet=mongoose.model('Tweet',tweetSchema);    


export default Tweet;