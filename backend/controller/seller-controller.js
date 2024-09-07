import Seller from "../model/sellerModel.js";
import SellerService from "../service/seller-service.js";
import { validateAccountNumber, validateIFSC } from "../utils/helper.js";

const sellerService = new SellerService();

const create = async (req, res) => {
    try {
        const { userId, accountNo, ifscCode, bank } = req.body;

        // Check if the user is already a seller
        const existingSeller = await Seller.findOne({ userId });
        if (existingSeller) {
            return res.status(400).send('User is already a seller.');
        }

        if(!validateAccountNumber(accountNo)){
            return res.status(400).send('Please provide a valid account number');
        }

        const isValidIFSC=await validateIFSC(ifscCode);
        if (!isValidIFSC) {
            return res.status(400).send('Please provide a valid IFSC code');
        }

        const seller = await sellerService.create(req.body);
        await seller.save();
        return res.status(200).json({
            message: "Successfully created the seller profile",
            data: seller,
            err: {},
            success: true
        });
    } catch (error) {
        console.log("Something went wrong in seller controller layer", error);
        return res.status(500).json({
            data: {},
            err: error.message,
            success: false,
            message: "Internal Server Error. Not able to create the seller"
        });
    }
};

const destroy = async (req, res) => {
    try {
        const { id: userId } = req.query;  // Use URL parameters
        const response = await sellerService.deleteSeller(userId);
        return res.status(200).json({
            message: "Successfully deleted the seller",
            data: response,
            err: {},
            success: true
        });
    } catch (error) {
        console.log("Something went wrong in seller controller layer", error);
        return res.status(500).json({
            data: {},
            err: error.message,
            success: false,
            message: "Internal Server Error. Not able to delete the seller"
        });
    }
};

const get = async (req, res) => {
    try {
        const { id: userId } = req.query;  // Use URL parameters
        const response = await sellerService.getSeller(userId);
        if(!response){
            return res.status(400).send('User doesnt exist');
        }
        return res.status(200).json({
            message: "Successfully fetched the seller details",
            data: response,
            err: {},
            success: true
        });
    } catch (error) {
        console.log("Something went wrong in seller controller layer", error);
        return res.status(500).json({
            data: {},
            err: error.message,
            success: false,
            message: "Internal Server Error. Not able to get the seller"
        });
    }
};

const update = async (req, res) => {
    try {
        const { id: userId } = req.query;  // Use URL parameters
        const seller = await sellerService.updateSeller(userId, req.body);
        return res.status(200).json({
            message: "Successfully updated the seller details",
            data: seller,
            err: {},
            success: true
        });
    } catch (error) {
        console.log("Something went wrong in seller controller layer", error);
        return res.status(500).json({
            data: {},
            err: error.message,
            success: false,
            message: "Internal Server Error. Not able to update the seller details"
        });
    }
};

export { create, update, destroy, get };
