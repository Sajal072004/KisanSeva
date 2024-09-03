import Hashtag from '../model/hashtags.js'

class HashtagRepository{
    async create(data){
        try {
            const tag=await Hashtag.create(data);
            return tag;
        } catch (error) {
            console.log (error);
        }
    }

    async bulkCreate(data){             //get a data array.An array of objects. We are storing hashtags with their tweets id so that when we click on hashtag all tweets comes with that
        try {
            const tags=await Hashtag.insertMany(data);
            return tags;
        } catch (error) {
            console.log(error);
        }
    }


    async get(id){                                           
        try {
            const tag=await Hashtag.findById(id);
            return tag;
        } catch (error) {
            console.log (error);
        }
    }

    async destroy(id){
        try {
            const response=await Hashtag.findByIdAndRemove(id);
            return response;
        } catch (error) {
            console.log (error);
        }
    }

    async findByName(titleList){
        try {
            const tags=await Hashtag.find({
                title:titleList,
            })             //poora object aa rha tha ab sirf title . Pehle select kiye the lekin select('title -_id') lekin ab humko array ka poora object chahiye change karne ke liye. 
            return tags;
        } catch (error) {
            console.log(error);
        }
    }

    

}

export default HashtagRepository;