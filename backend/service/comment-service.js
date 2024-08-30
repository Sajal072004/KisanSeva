import { CommentRepository,TweetRepository } from "../repository/index.js"; 


class CommentService {
    constructor(){
        this.commentRepository=new CommentRepository();
        this.tweetRepository=new TweetRepository();
    }

    async createComment (modelId,modelType,userId,content){
        // console.log(modelId,modelType,userId,content)
        if(modelType=='Tweet'){
            var commentable=await this.tweetRepository.find(modelId);    
            // console.log(commentable);
        }
        else if(modelType=='Comment'){
            var commentable=await this.commentRepository.get(modelId);
            // console.log(commentable);
        }
        else {
            throw new Error('Invalid model type');
        }
        // console.log(commentable);
        const comment=await this.commentRepository.create({
            content:content,
            userId:userId,
            onModel:modelType,
            commentable:modelId,
            comments:[]
        });
        console.log(comment);
        commentable.comments.push(comment);
        await commentable.save();

        return comment;
    }
}

export default CommentService;