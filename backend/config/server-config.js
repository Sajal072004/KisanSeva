import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI=process.env.MONGODB_URI;
export const JWT_SECRET=process.env.JWT_SECRET;
export const APP_PASS=process.env.APP_PASS;
export const IFSC_API_KEY=process.env.IFSC_API_KEY;