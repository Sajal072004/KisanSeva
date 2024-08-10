import userModel from "../model/userModel.js";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { JWT_SECRET } from "../config/server-config.js";
import nodemailer from 'nodemailer'

const loginUser=async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user=await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(401).json({
                message:"Invalid user or password",
                success:false
            })
        }

        const token=createToken(user._id);
        res.json({
            success:true,
            token:token,
            data:user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}

const createToken=(id)=>{
    return jwt.sign({id},JWT_SECRET,{expiresIn:'1h'});
}

const registerUser=async(req,res)=>{
    const {name,email,password,phone,address}=req.body;
    try {
        const exists=await userModel.findOne({email});
        if(exists){
            return res.status(200).json({
                message:"User already exists",
                data:exists,
                success:true
            })
        }

        if(!validator.isEmail(email)){
            return res.status(402).json({
                message:"Write a valid email",
                success:false
            })
        }

        //hashing
        const SALT=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,SALT);

        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword,
            phone:phone,
            address:address
        })

        const user=await newUser.save();
        const token=createToken(user._id);
        res.status(202).json({
            message:"Verified token",
            success:true,
            token:token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Not verified token"
        })
    }
}

const forget=async (req,res)=>{
    const {email}=req.body;
    try {
        const generateOtp=Math.floor(100000 + Math.random() * 900000);      //6 digit otp
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "abfc0bbef1a1e2",
              pass: "4da84564a8f923"
            }
          });

          const info = await transporter.sendMail({
            from: "krishisevakr@gmail.com", 
            to: email, // list of receivers
            subject: "New Otp generated", // Subject line
            html: `<b>Otp is : <i>${generateOtp}</i></b>`, // html body
          });

          if(info.messageId){
            let user=await userModel.findOneAndUpdate(
                {email},
                {otp:generateOtp},
                {new:true}
            );

            if(!user){
                return res.status(404).json({
                    message:"User not found",
                    success:false
                })
            }
          }
          return res.status(202).json({
            message:"Otp sent successfully",
            success:true,
            data:info
          })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server error",
            success:false,
        })
    }
}

const verify=async (req,res)=>{
    const {otp,password}=req.body;

    try {
        let user=await userModel.findOne({otp});
        if(!user){
            return res.status(404).json({
                message:"User not found",
                success:false
            })
        }

        const SALT=await bcrypt.genSalt(10);
        const securePassword=await bcrypt.hash(password,SALT);

        user=await userModel.findOneAndUpdate(
            {otp},
            {password:securePassword,otp:0},
            {new:true}
        );

        return res.status(202).json({
            message:"Password changed successfully",
            success:true,
            data:user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Internal Server error",
            success:false,
        })
    }
}


export {
    loginUser,
    registerUser,
    forget,
    verify
}

