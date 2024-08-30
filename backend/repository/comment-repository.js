import Comment from "../model/comment.js";

import CrudRepository from "./crud-repository.js";

class CommentRepository extends CrudRepository{
    constructor(){
        super(Comment);
    }

    async find(id){
        try {
            const comment=await Comment.findById(id).populate({path:'likes'});  //It should always be attached to mongoose query object
            console.log(comment);
            return comment;
        } catch (error) {
            console.log(error);
        }
    }
    
}

export default CommentRepository;