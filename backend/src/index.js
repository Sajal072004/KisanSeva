import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {PORT}  from '../config/server-config.js'


const app=express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const setup_and_start_server=async()=>{
    app.listen(PORT,()=>{
        console.log('Server is running on PORT:',PORT);
    })
}


setup_and_start_server();