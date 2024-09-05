import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import {PORT}  from '../config/server-config.js'
import { connectDB } from '../config/db.js'
import apiRoutes from '../routes/index.js'
import cookieParser from 'cookie-parser'
import { setupJobs } from '../utils/job.js'

//Middlewares
const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('tiny'));        //for logging purpose
app.disable('x-powered-by');    //less hackers will know about our stack

//Db connection
connectDB().then(()=>{
    setupJobs();
});

//Routes
app.use('/api',apiRoutes);

const setup_and_start_server=async()=>{
    app.listen(PORT,()=>{
        console.log('Server is running on PORT:',PORT);
    })
}


setup_and_start_server();