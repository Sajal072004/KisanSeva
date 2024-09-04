import TransactionService from "../service/transaction-service.js";

const transactionService=new TransactionService();

const createTransaction=async (req,res)=>{
    try {
        const transaction=await transactionService.create(req.body);
        return res.status(200).json({
            data:transaction,
            success:true,
            err:{},
            message:"Successfully done the transaction"
        })
    } catch (error) {
        console.log("Something wrong in transaction-controller",error);
        return res.status(500).json({
            message:"Internal Server Layer in transaction",
            err:error.message,
            data:{},
            success:false
        })
    }
}

export {createTransaction};