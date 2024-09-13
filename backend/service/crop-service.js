import CropRepository from "../repository/crop-repository.js";
import { checkDates } from "../utils/helper.js";

class CropService{
    constructor(){
        this.cropRepository=new CropRepository();
    }

    async createCrop(data){
        try {
            if(!checkDates(data.harvestDate,data.expiryDate)){
                throw new Error ("Harvest date can't be after expiry date")
            }
            const crop=await this.cropRepository.create(data);
            await crop.save();
            return crop;

        } catch (error) {
            console.log("Something wrong in crop service layer",error);
            throw error;
        }
        
    }

    async getAllCrops(){
        try {
           const crops=await this.cropRepository.findInStockCrops() ;
           return crops;
        } catch (error) {
           console.log('Something wrong in service layer',error); 
        }
    }

    async destroy(id){
        try {
            const response=await this.cropRepository.destroy(id);
            return response;
        } catch (error) {
            console.log("Something went wrong in crop-service",error);
        }
    }

    async get(id){
        try {
        //    console.log(id);
           const response=await this.cropRepository.get(id);
           return response; 
        } catch (error) {
            console.log("Something went wrong in crop-service",error);
        }
    }

    async update(id,data){
        try {
           const response=await this.cropRepository.update(id,data);
           return response; 
        } catch (error) {
            console.log("Something went wrong in crop-service update",error);
        }
    }
}

export default CropService;
