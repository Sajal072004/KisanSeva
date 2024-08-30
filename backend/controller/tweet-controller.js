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