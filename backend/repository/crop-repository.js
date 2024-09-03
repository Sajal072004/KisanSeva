import Crop from "../model/cropModel.js";

import CrudRepository from "./crud-repository.js";

class CropRepository extends CrudRepository{
    constructor(){
        super(Crop);
    }

    async findInStockCrops(){
        try {
            const crops=await Crop.find({status:'InStock'});
            return crops;
        } catch (error) {
            console.log("Something went wrong in crop repo",error);
        }
    }


};

export default CropRepository;