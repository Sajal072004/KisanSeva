import { TweetRepository,HashtagRepository } from "../repository/index.js";

class TweetService{
    constructor(){
        this.tweetRepository=new TweetRepository();
        this.hashtagRepository=new HashtagRepository();
    }

    async create(data){
        // const title=data.title;
        const content=data.content;

        //hashtags will be in content
        const tagsMatch = content.match(/#[a-zA-Z0-9_]+/g);
        const tags = tagsMatch ? tagsMatch.map((tag) => tag.substring(1).toLowerCase()) : [];


        const tweet=await this.tweetRepository.create(data);

        let alreadyPresentTags=await this.hashtagRepository.findByName(tags);
        let titleOfPresentTags=alreadyPresentTags.map(tags=>tags.title);

        let newTags=tags.filter(tag=>!titleOfPresentTags.includes(tag));

        newTags=newTags.map(tag=>{
            return {title:tag,tweets:[tweet.id]}
        });

        const response=await this.hashtagRepository.bulkCreate(newTags);      
        alreadyPresentTags.forEach((tag)=>{
            tag.tweets.push(tweet.id);
            tag.save();
        });

        return tweet;
    }

    async getTweet(tweetId){
        const tweet=await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }

    async allTweetsOfUser(userId){
        try {
            const tweets=await this.tweetRepository.allTweetsOfUser(userId);
            return tweets;
        } catch (error) {
            console.log("Error in tweet service in fetching tweets",error);
            throw error;
        }
    }

    async getAllTweets(){
        try {
            const tweets=await this.tweetRepository.getAll();
            return tweets;
        } catch (error) {
            console.log("Error in tweet service in fetching tweets",error);
            throw error;
        }
    }

}

export default TweetService;