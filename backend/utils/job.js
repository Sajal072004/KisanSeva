import corn from 'node-cron'
// import CropRepository from '../repository/crop-repository.js'
import { updateExpiredCrops } from './helper.js'

export const setupJobs=async ()=>{
    corn.schedule('0 0 * * *',async()=>{
        console.log('Running task to update expired crops...');
       await  updateExpiredCrops();
    } )
}

