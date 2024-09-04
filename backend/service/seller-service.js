import SellerRepository from "../repository/seller-repository.js";

class SellerService{
    constructor(){
        this.sellerRepository=new SellerRepository();
    }

    async create(data){
        try {
            const seller=await this.sellerRepository.create(data);
            return seller;
        } catch (error) {
            console.log("Something went wrong in seller-service layer",error);
            throw error;
        }
    }

    async deleteSeller(userId){
        try {
           const response=await this.sellerRepository.deleteSeller(userId);
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