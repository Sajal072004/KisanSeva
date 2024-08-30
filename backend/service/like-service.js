import { LikeRepository,TweetRepository ,CommentRepository} from "../repository/index.js";


class LikeService{
    constructor(){
        this.likeRepository=new LikeRepository();
        this.tweetRepository=new TweetRepository();
        this.commentRepository=new CommentRepository();
    }

    async toggleLike(modelId,modelType,userId){
        // console.log(modelId);
        // console.log(modelId,modelType,userId);
        if(modelType=='Tweet'){
            var likeable=await this.tweetRepository.find(modelId);         //pehle se jo likes hai wo bhi aa jaaye.
            // console.log(likeable);

        }
        else if(modelType=='Comment'){
            var likeable=await this.commentRepository.find(modelId);
        }
        else {
            throw new Error('Invalid model type');
        }

        const exists=await this.likeRepository.findByUserAndLikeable({               
            userId:userId,    
            onModel:modelType,                  
            likeable:modelId               
        })
        if(exists){    
            // console.log(exists);                             
            likeable.likes.pull(exists.id);
            await likeable.save();
            await this.likeRepository.destroy(exists.id);

            var isRemoved=true;
        }

        else {                      //nhi to like create karo
            const newLike=await this.likeRepository.create({
                userId:userId,    
                onModel:modelType,
                likeable:modelId
        })
        likeable.likes.push(newLike);           //this push and pull is provided by mongoose
        await likeable.save();
        
        var isRemoved=false;

        }

        return isRemoved;
    }
}

export default LikeService;