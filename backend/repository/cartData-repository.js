import CartData from "../model/cartModel.js";


class CartDataRepository{
    async createCart(data){
        try {
            const cart=await CartData.create(data);
            return cart;
        } catch (error) {
            console.log("Something went wrong in cart-repo",error);
            throw error;
        }
    }

    async deleteCart(id){
        try {
            
        } catch (error) {
            console.log("Something went wrong in cart-repo",error);
            throw error;
        }
    }
}