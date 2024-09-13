import userModel from "../model/userModel.js";

const addToCart=async (req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1;
        }
        else{
            cartData[req.body.itemId]+=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        return res.status(200).json({
            success:true,
            message:"item is added to cart",
            data:cartData
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Not able to add."
        })
        
    }

}

const removeFromCart=async (req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.status(201).json({
            message:"item deleted from the cart",
            success:true,
            data:cartData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Not able to delete",

        })
    }
}

const getCart=async(req,res)=>{
    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        res.status(200).json({
            message:"Successfully fetched the cart items",
            data:cartData,
            success:true
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Not able to get the cart items",
            success:false
        })
    }
}


export{
    addToCart,
    removeFromCart,
    getCart
}