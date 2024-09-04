import Transaction from "../model/transactionModel.js";

class TransactionRepository{

    async create(data){
        try {
            const transaction=await Transaction.create(data);
            return transaction;
        } catch (error) {
            console.log("Something went wrong in transaction repo",error);
            throw error;
        }
    }
}

export default TransactionRepository;