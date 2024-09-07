import TransactionService from "../service/transaction-service.js";

const transactionService=new TransactionService();

const createTransaction = async (req, res) => {
    try {
        // Extract buyerId (from the authenticated user) and sellerId (from the request body)
        const { buyerId, sellerId, items, totalAmount } = req.body;

        if (!buyerId || !sellerId || !items || !totalAmount) {
            return res.status(400).json({
                message: "Missing required fields (buyerId, sellerId, items, or totalAmount)",
                success: false
            });
        }

        // Prepare the data object for the transaction
        const transactionData = {
            buyerId,
            sellerId,
            items, // Array of crops purchased
            totalAmount,
            transactionType: 'purchase' // This could be 'sale' or 'purchase' depending on the flow
        };

        // Call the service to create the transaction
        const transaction = await transactionService.purchaseCrop(transactionData);

        return res.status(200).json({
            data: transaction,
            success: true,
            err: {},
            message: "Successfully completed the transaction"
        });
    } catch (error) {
        console.log("Something went wrong in transaction-controller", error);
        return res.status(500).json({
            message: "Internal Server Error in transaction",
            err: error.message,
            data: {},
            success: false
        });
    }
};

const getLast10Transactions = async (req, res) => {
    try {
        const { userId } = req.body;  // Extract userId from request body

        // Fetch transactions
        const transactions = await transactionService.getLast10Transactions(userId);

        return res.status(200).json({
            data: transactions,
            success: true,
            message: "Successfully fetched last 10 transactions"
        });
    } catch (error) {
        console.log("Something went wrong in transaction-controller", error);
        return res.status(500).json({
            message: "Internal Server Error",
            err: error.message,
            success: false
        });
    }
};

export { createTransaction,getLast10Transactions };