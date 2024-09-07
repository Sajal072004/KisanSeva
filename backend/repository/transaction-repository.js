import Transaction from "../model/transactionModel.js";
import Crop from "../model/cropModel.js"
import userModel from "../model/userModel.js";

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

    async updateCropQuantities(items) {
        try {
            const updateCrops = items.map(async (item) => {
                const crop = await Crop.findById(item.cropId);
                if (!crop) throw new Error('Crop not found');

                if (crop.quantity < item.quantity) {
                    throw new Error(`Not enough stock for crop: ${crop.name}`);
                }

                crop.quantity -= item.quantity;
                if (crop.quantity === 0) {
                    crop.status = 'OutOfStock'; // Update status if needed
                }
                return crop.save();
            });

            await Promise.all(updateCrops);
        } catch (error) {
            console.log("Something went wrong in updating crop quantities", error);
            throw error;
        }
    }

    async updateUserSpent(userId, amount) {
        try {
            const user = await userModel.findById(userId);
            if (!user) throw new Error('User not found');

            user.totalSpent += amount;
            await user.save({ validateBeforeSave: false });

            return user;
        } catch (error) {
            console.log("Something went wrong in updating user spent", error);
            throw error;
        }
    }

    async updateUserEarned(userId, amount) {
        try {
            const user = await userModel.findById(userId);
            if (!user) throw new Error('User not found');

            user.totalEarned += amount;
            await user.save({ validateBeforeSave: false });

            return user;
        } catch (error) {
            console.log("Something went wrong in updating user earned", error);
            throw error;
        }
    }

    async getLast10Transactions(userId) {
        try {
            const transactions = await Transaction.find({
                $or: [
                    { buyerId: userId },
                    { sellerId: userId }
                ]
            })
            .sort({ date: -1 }) 
            .limit(10)
            .lean();                    // to get js objects

            const updatedTransactions = transactions.map(transaction => {
                if (transaction.buyerId.toString() === userId.toString()) {
                    transaction.transactionType = 'purchase';  
                } 
                else if (transaction.sellerId.toString() === userId.toString()) {
                    transaction.transactionType = 'sale'; 
                }
                return transaction;
            });

            return updatedTransactions;
        } catch (error) {
            console.log("Something went wrong in fetching transactions", error);
            throw error;
        }
    }
}

export default TransactionRepository;