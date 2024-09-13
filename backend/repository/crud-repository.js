import mongoose from "mongoose";

class CrudRepository{
    constructor(model){
        this.model=model;
    }

    async create(data){
        // console.log("Data to be created:", data);
        try {
            const result=await this.model.create(data);
            console.log(result ,"This is made in crud repo",result);
            return result;
        } catch (error) {
            console.log("Something wrong at repository level in crud :",error);
            throw error;
        }
    }

    async destroy(id){
        try {
            const result=await this.model.findByIdAndDelete(id);
            return result;
        } catch (error) {
            console.log("Something wrong at repository level in crud :",error);
            throw error;
        }
    }

    async get(id) {
        try {
            if (!mongoose.Types.ObjectId.isValid(id)) {
                throw new Error('Invalid ID format');
            }
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log("Something wrong at repository level in crud:", error);
            throw error;
        }
    }

    async getAll(){
        try {
            const result=await this.model.find({});
            return result;
        } catch (error) {
            console.log("Something wrong at repository level in crud :",error);
            throw error;
        }
    }

    async update(id,data){
        try {
            const result=await this.model.findByIdAndUpdate(id,data,{new:true});            //nhi karte hai to update karne se pehle wali value return karta hai 
            return result;
        } catch (error) {
            console.log("Something wrong at repository level in crud :",error);
            throw error;
        }
    }

    
}

export default CrudRepository;