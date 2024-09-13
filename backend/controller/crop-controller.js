import CropService from '../service/crop-service.js'
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
import multer from 'multer';
import firebaseConfig from '../config/server-config.js';

const cropService=new CropService();

initializeApp(firebaseConfig);

// Initialize Firebase Cloud Storage
const storage = getStorage();

// Set up multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

const createCrop=async(req,res)=>{
    try {

        let imageUrl = '';
        if (req.file) {
            const storageRef = ref(storage, `files/${Date.now()}_${req.file.originalname}`);
            const metadata = { contentType: req.file.mimetype };
            const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
            imageUrl = await getDownloadURL(snapshot.ref);
        }

        // console.log(req.body);
        const cropData = { ...req.body, image: imageUrl };  // Add image URL to crop data
        const crop = await cropService.createCrop(cropData);
        console.log(crop);
        return res.status(200).json({
            data:crop,
            success:true,
            message:"Successfully created the crop",
            type: req.file.mimetype,
            err:{}
        })
    } catch (error) {
        console.log("Something wrong in crop controller layer",error);
        return res.status(500).json({
            success:false,
            data:{},
            err:error.message,
            message:"Not able to create the crop "
        });
    }
};

const getAllCrops=async (req,res)=>{
    try {
        const crops=await cropService.getAllCrops();
        console.log(crops);
        return res.status(200).json({
            data:crops,
            success:true,
            message:"Successfully fetched all the crops with status InStock",
            err:{}
        })
    } catch (error) {
        console.log("Something wrong in crop controller layer",error);
        return res.status(500).json({
            success:false,
            data:{},
            err:error.message,
            message:"Not able to fetch the crops"
        });
    }
}

const deleteCrop=async(req,res)=>{
    try {
        const response=await cropService.destroy(req.query.id);
        console.log(response);
        return res.status(200).json({
            data:response,
            success:true,
            err:{},
            message:"Successfully deleted the crop"
        })
    } catch (error) {
        console.log("Something wrong in crop controller layer",error);
        return res.status(500).json({
            success:false,
            data:{},
            err:error.message,
            message:"Not able to delete the crop"
        });
    }
}

const getCrop=async(req,res)=>{
    try {
        console.log(req.query.id);
        const response=await cropService.get(req.query.id);
        return res.status(200).json({
            success:true,
            data:response,
            err:{},
            message:"Successfully fetched the crop"
        })
    } catch (error) {
        console.log("Something wrong in crop controller layer",error);
        return res.status(500).json({
            success:false,
            data:{},
            err:error.message,
            message:"Not able to fetch the crop"
        });
    }
}

const updateCrop=async (req,res)=>{
    try {
        console.log(req.params.id,req.body);
        const crop=await cropService.update(req.params.id,req.body);
        return res.status(200).json({
            data:crop,
            success:true,
            err:{},
            message:"Successfully updated the crop "
        })
    } catch (error) {
        console.log("Something wrong in crop controller layer",error);
        return res.status(500).json({
            success:false,
            data:{},
            err:error.message,
            message:"Not able to update the crop"
        });
    }
}

export {upload,createCrop,getAllCrops,deleteCrop,getCrop,updateCrop}