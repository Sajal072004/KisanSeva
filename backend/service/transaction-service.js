import TransactionRepository from "../repository/transaction-repository.js";


class TransactionService{
    constructor(){
        this.transactionRepository=new TransactionRepository();
    }

    async create(data){
        try {
           const transaction=await this.transactionRepository.create(data);
           return transaction; 
        } catch (error) {
            console.log("Something went wrong in transaction service",error);
            throw error;
        }
    }
}

export default TransactionService;