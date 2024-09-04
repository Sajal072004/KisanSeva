import Seller from "../model/sellerModel.js";

class SellerRepository {
    async create(data) {
        try {
            const seller = await Seller.create(data);
            return seller;
        } catch (error) {
            console.log("Something wrong at repository level in seller:", error);
            throw error;
        }
    }

    async deleteSeller(userId) {
        try {
            const response = await Seller.findOneAndDelete({ userId: userId });
            return response;
        } catch (error) {
            console.log("Something wrong at repository level in seller:", error);
            throw error;
        }
    }

    async getSeller(userId) {
        try {
            const seller = await Seller.findOne({ userId: userId });
            return seller;
        } catch (error) {
            console.log("Something went wrong in seller repo", error);
            throw error;
        }
    }

    async updateSeller(userId, data) {
        try {
            const seller = await Seller.findOneAndUpdate({ userId: userId }, data, { new: true });
            return seller;
        } catch (error) {
            console.log("Something went wrong in seller repo", error);
            throw error;
        }
    }
}

export default SellerRepository;
