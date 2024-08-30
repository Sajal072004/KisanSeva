import LikeService from "../service/like-service.js";

const likeService=new LikeService();


export const toggleLike=async(req,res)=>{
    try {
        // console.log(req.query.modelId,req.query.modelType,req.body.userId);
        // console.log(req.body.userId);
        const response=await likeService.toggleLike(req.query.modelId,req.query.modelType,req.body.userId);
        console.log(response);
        return res.status(200).json({
            data:response,
            success:true,
            err:{},
            message:"Successfully toggled the like"
        })
        
    } catch (error) {
        console.log("Error in controller layer",error);
        return res.status(500).json({
            success:false,
            data:{},
            err:error,
            message:'Something Went Wrong'
        })
    }
}

export default toggleLike;