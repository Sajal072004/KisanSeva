import { TweetRepository,HashtagRepository } from "../repository/index.js";

class TweetService{
    constructor(){
        this.tweetRepository=new TweetRepository();
        this.hashtagRepository=new HashtagRepository();
    }

    async create(data){
        const title=data.title;
        const content=data.content;

        //hashtags will be in content
        const tags=content.match(/#[a-zA-Z0-9_]+/g).map((tag)=>tag.substring(1))
        .map((tag)=>tag.toLowerCase());

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

}

export default TweetService;