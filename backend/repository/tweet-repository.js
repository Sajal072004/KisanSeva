import Tweet from '../model/tweet.js'
import CrudRepository from './crud-repository.js';

class TweetRepository{
    constructor(Tweet){
        
    }

    async create(data){
        try {
            const tweet=await Tweet.create(data);
            return tweet;
        } catch (error) {
            console.log (error);
        }
    }

    async allTweetsOfUser(userId){
        try {
            const tweets=await Tweet.find({userId});
            return tweets;
        } catch (error) {
            console.log("Error in tweet repo in all tweet function",error)
        }
    }


    async getWithComments(id){
        try {                                                       //comments jo tum schema mein likhe ho
            const tweet=await Tweet.findById(id).populate({
                path:'comments',
                populate:{
                    path:'comments'            
                }
            }).lean();     
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async getAll(){             //sirf find karoge to saare aa jayenge
        try {
            const tweet=await Tweet.find().sort({ createdAt: -1 });
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async find(id){
        try {
            const tweet=await Tweet.findById(id).populate({path:'likes'});  //It should always be attached to mongoose query object
            console.log(tweet);
            return tweet;
        } catch (error) {
            console.log(error);
        }
    }

    async findTweetIdByTitle(title){
        try {
            const id=await Tweet.findOne()
        } catch (error) {
            console.log(error);
        }
    }
}

export default TweetRepository;