import CommentService from "../service/comment-service.js";

const commentService=new CommentService();


export const createComment=async(req,res)=>{
    try {
        // console.log(req.body.userID,req.body.comment)
        const response=await commentService.createComment(req.query.modelId,req.query.modelType,req.body.userId,req.body.content);
        return res.status(200).json({
            data:response,
            success:true,
            err:{},
            message:"Successfully Created the comment"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            data:{},
            err:error,
            message:'Something Went Wrong'
        })
    }
}


export default createComment;