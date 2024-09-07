import SellerRepository from "../repository/seller-repository.js";
import userModel from "../model/userModel.js";

class SellerService{
    constructor(){
        this.sellerRepository=new SellerRepository();
    }

    async create(data){
        try {
            const user = await userModel.findById(data.userId);
            if (user.isSeller) {
                throw new Error('User is already a seller bsdk');
            }

            // Create seller profile
            const seller = await this.sellerRepository.create(data);

            // Update user to set isSeller = true
            user.isSeller = true;
            await user.save();
            return seller;
        } catch (error) {
            console.log("Something went wrong in seller-service layer",error);
            throw error;
        }
    }

    async deleteSeller(userId){
        try {
           const response=await this.sellerRepository.deleteSeller(userId);

           const user = await userModel.findById(userId);
           user.isSeller = false;
           await user.save();
           return response; 
        } catch (error) {
            console.log("Something went wrong in seller-service layer",error);
            throw error;
        }
    }

    async getSeller(userId){
        try {
            const response=await this.sellerRepository.getSeller(userId);
            return response;
        } catch (error) {
            console.log("Something went wrong in seller-service layer",error);
            throw error;
        }
    }

    async updateSeller(userId,data){
        try {
            const seller=await this.sellerRepository.updateSeller(userId,data);
            return seller;
        } catch (error) {
            console.log("Something went wrong in seller-service layer",error);
            throw error;
        }
    }
}

export default SellerService;