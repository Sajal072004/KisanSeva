import SellerRepository from "../repository/seller-repository.js";
import userModel from "../model/userModel.js";

class SellerService {
  constructor() {
    this.sellerRepository = new SellerRepository();
  }

  async create(data) {
    try {
    // console.log("data" ,data);
      const user = await userModel.findById(data.userId);
    //   console.log(user);
      if (!user) {
        throw new Error("User not found");
      }

      if (user.isSeller) {
        throw new Error("User is already a seller bsdk");
      }

      // Create seller profile
      const seller = await this.sellerRepository.create(data);
      try {
        await userModel.findByIdAndUpdate(data.userId, {
          isSeller: true,
        });
        console.log("User updated successfully");
      } catch (error) {
        console.error("Error updating user:", error);
      }

      return seller;
    } catch (error) {
      console.log("Something went wrong in seller-service layer", error);
      throw error;
    }
  }

  async deleteSeller(userId) {
    try {
      const response = await this.sellerRepository.deleteSeller(userId);

      const user = await userModel.findById(userId);
      user.isSeller = false;
      await user.save();
      return response;
    } catch (error) {
      console.log("Something went wrong in seller-service layer", error);
      throw error;
    }
  }

  async getSeller(userId) {
    try {
      const response = await this.sellerRepository.getSeller(userId);
      return response;
    } catch (error) {
      console.log("Something went wrong in seller-service layer", error);
      throw error;
    }
  }

  async updateSeller(userId, data) {
    try {
      const seller = await this.sellerRepository.updateSeller(userId, data);
      return seller;
    } catch (error) {
      console.log("Something went wrong in seller-service layer", error);
      throw error;
    }
  }
}

export default SellerService;
