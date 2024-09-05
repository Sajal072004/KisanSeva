import axios from "axios";
import Crop from "../model/cropModel.js";
import CropRepository from "../repository/crop-repository.js";

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




export {checkDates,updateExpiredCrops};
