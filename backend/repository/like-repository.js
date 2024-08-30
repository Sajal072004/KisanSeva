import Like from '../model/like.js'
import CrudRepository from "./crud-repository.js";

class LikeRepository extends CrudRepository{
    constructor(){
        super(Like);
    }

    async findByUserAndLikeable(data){
        try {
            console.log(data);
            const like=await Like.findOne(data);
            // console.log("This is like ",like);
            return like;
        } catch (error) {
            console.log("In like-repository",error);
            throw error;
        }
    }
}

export default LikeRepository;