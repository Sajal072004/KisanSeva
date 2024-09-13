import axios from "axios";
import Crop from "../model/cropModel.js";
import CropRepository from "../repository/crop-repository.js";
import { IFSC_API_KEY } from "../config/server-config.js";

const cropRepository=new CropRepository();


function checkDates(harvestDate, expiryDate) {
    // Convert input strings to Date objects
    const harvest = new Date(harvestDate);
    const expiry = new Date(expiryDate);

    return harvest < expiry;
}

function isExpired(expiryDate){
    const expiry=new Date(expiryDate); 
    const currDate= new Date();
    return expiry<currDate;            //matlab expire ho gya hai 
}

async function updateExpiredCrops(){
    try {
       const inStockCrops=await cropRepository.findInStockCrops();
       
       //filter expired crops
       const expiredCrops= inStockCrops.filter(crop=>isExpired(crop.expiryDate));

       //update status to expired
       for(const crop of expiredCrops){
        await Crop.updateOne({ _id: crop._id }, { $set: { status: 'Expired' } });
       }

       console.log(`Updated ${expiredCrops.length} crops to 'Expired' status.`);
    } catch (error) {
        console.log("Error updating expired crops",error);
    }
}


//validation check on account no
export const validateAccountNumber = (accountNo) => {
    // Account numbers can vary in length between banks, 
    // but generally they are between 9 to 18 digits long.
    const accountNoRegex = /^\d{9,18}$/;

    return accountNoRegex.test(accountNo);
};

//validation check for ifsc code
export const validateIFSC = async (ifscCode) => {
    try {
        const response = await axios.post(
            'https://api.apyhub.com/validate/ifsc',
            {
                ifsc: ifscCode // Pass IFSC in the request body
            },
            {
                headers: {
                    'apy-token': IFSC_API_KEY, 
                    'Content-Type': 'application/json'
                }
            }
        );

        // If the response indicates the IFSC is valid
        if (response.data && response.data.data && response.data.data.valid) {
            return true;  // IFSC is valid
        } else {
            return false; // IFSC is invalid
        }
    } catch (error) {
        console.error("Error validating IFSC code:", error.response?.data || error.message);
        return false; // Handle errors gracefully, assume invalid if there's an issue
    }
};




export {checkDates,updateExpiredCrops};
