import TweetService from "../service/tweet-service.js"

const tweetService=new TweetService();

export const createTweet=async (req,res)=>{ 
    try {
        // console.log(req.body);
        const response=await tweetService.create(req.body);
        // console.log(response);
        return res.status(201).json({
            success:true,
            message:'Successfully created the tweet',
            err:{},
            data:response,
        })
    } catch (error) {
        console.log("Service error",error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            err:error,
            data:{}
        })
    }
}

export const getTweet=async (req,res)=>{
    try {

        const response=await tweetService.getTweet(req.params.id);
        console.log(response);
        return res.status(200).json({
            success:true,
            message:'Successfully fetched the tweet',
            err:{},
            data:response,
        })
    } catch (error) {
        console.log("Service error",error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            err:error,
            data:{}
        })
    }
}

export const getAllTweetsOfUser=async (req,res)=>{
    try {
        const {id}=req.params;
        const response=await tweetService.allTweetsOfUser(id);
        console.log(response);
        return res.status(202).json({
            success:true,
            data:response,
            err:{},
            message:"Successfully fetched all the tweets of that user"
        })
    } catch (error) {
        console.log("Error in tweet controller in getting tweets",error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            err:error,
            data:{}
        })
    }
}

export const getAllTweets=async (req,res)=>{
    try {
        const tweets=await tweetService.getAllTweets();
        console.log(tweets);
        return res.status(202).json({
            success:true,
            data:tweets,
            err:{},
            message:"Successfully fetched all the tweets"
        })
    } catch (error) {
        console.log("Error in tweet controller in getting tweets",error);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            err:error,
            data:{}
        })
    }
}