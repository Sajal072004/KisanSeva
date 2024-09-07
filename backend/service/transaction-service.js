import TransactionRepository from "../repository/transaction-repository.js";
import Crop from "../model/cropModel.js";


class TransactionService{
    constructor(){
        this.transactionRepository=new TransactionRepository();
    }

    async purchaseCrop(data){
        try {
            // Ensure data includes both buyerId and sellerId
            if (!data.buyerId || !data.sellerId) {
                throw new Error('Both buyerId and sellerId are required');
            }


            for (const item of data.items) {
                const crop = await Crop.findById(item.cropId);
                if (!crop) throw new Error('Crop not found');
    
                // Check if there's enough stock for each item
                if (crop.quantity < item.quantity) {
                    throw new Error(`Not enough stock for crop: ${crop.name}`);
                }
            }

            const transaction = await this.transactionRepository.create(data);

            await this.transactionRepository.updateCropQuantities(data.items);

            // Update the buyer's totalSpent
            await this.transactionRepository.updateUserSpent(data.buyerId, data.totalAmount);

            // Update the seller's totalEarned
            await this.transactionRepository.updateUserEarned(data.sellerId, data.totalAmount);

            return transaction;
        } catch (error) {
            console.log("Something went wrong in transaction service", error);
            throw error;
        }
    
    }

    async getLast10Transactions(userId) {
        try {
            return await this.transactionRepository.getLast10Transactions(userId);
        } catch (error) {
            console.log("Something went wrong in transaction service", error);
            throw error;
        }
    }
}

export default TransactionService;