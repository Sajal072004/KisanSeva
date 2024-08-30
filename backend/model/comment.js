import mongoose from "mongoose";

const commentSchema=new  mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    onModel:{                         
        type:String,
        required:true,
        enum:['Tweet','Comment']
    },
    commentable:{                               //same like kitarah yha bhi save karenge kispe comment kiye hai tweet pe ya comment pe 
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel',
        required:true
    },
    comments:[                                   //comments for comment
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ],
    likes:[{                                     //A tweet can have many likes   
        type:mongoose.Schema.Types.ObjectId,
        ref:'Like'
    }
    ]
   
    
},{
    timestamps:true
})                                                             
const Comment=mongoose.model('Comment',commentSchema);            

export default Comment;