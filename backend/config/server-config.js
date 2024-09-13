import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT;
export const MONGODB_URI=process.env.MONGODB_URI;
export const JWT_SECRET=process.env.JWT_SECRET;
export const APP_PASS=process.env.APP_PASS;
export const IFSC_API_KEY=process.env.IFSC_API_KEY;
export const STRIPE_SECRET_KEY=process.env.STRIPE_SECRET_KEY;

const firebaseConfig = {
    apiKey: "AIzaSyDdgZTbPhh5RTfONGxQ7C_xLCwexLTLu8U",
    authDomain: "kisanseva-d2b7b.firebaseapp.com",
    projectId: "kisanseva-d2b7b",
    storageBucket: "kisanseva-d2b7b.appspot.com",
    messagingSenderId: "508836750347",
    appId: "1:508836750347:web:7cb49cc8dc4b00f883d30e",
    measurementId: "G-W44WP977HQ"
  };
export default firebaseConfig;