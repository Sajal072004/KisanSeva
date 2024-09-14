import userModel from "../model/userModel.js";
import UserService from "../service/user-service.js";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { JWT_SECRET } from "../config/server-config.js";
import nodemailer from 'nodemailer'
import { APP_PASS } from "../config/server-config.js";

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
            data:user,
            userId:user._id,
            // name: name,
            // isSeller:isSeller
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
    return jwt.sign({id},JWT_SECRET,{expiresIn:'15d'});
}

const registerUser=async(req,res)=>{
    const {name,email,password,phone,state,gender,street,city,postalCode}=req.body;
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
            street:street,
            gender:gender,
            city:city,
            state:state,
            postalCode:postalCode
        })
        console.log(newUser);

        const user=await newUser.save();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for other ports
            auth: {
                user: "krishiseva27@gmail.com",  // Your email address
                pass: APP_PASS,  
            },
        });

        const info = await transporter.sendMail({
            from: "krishiseva@gmail.com",  // Sender address
            to: email,  // Receiver's email
            subject: "Welcome to Krishi Seva",  // Subject
            html: `
            <html>
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Krishi Seva</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f4f4f4;
                }
                .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  overflow: hidden;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                .header {
                  background-color: #1b7a43; /* Dark Green */
                  color: #ffffff;
                  padding: 20px;
                  text-align: center;
                  font-size: 28px;
                  font-weight: bold;
                }
                .content {
                  padding: 20px;
                }
                .cta {
                  background-color: #1b7a43; /* Dark Green */
                  color: #ffffff;
                  text-align: center;
                  padding: 15px;
                  border-radius: 5px;
                  margin: 20px 0;
                }
                .cta a {
                  color: #ffffff;
                  text-decoration: none;
                  font-weight: bold;
                }
                .footer {
                  background-color: #f4f4f4;
                  padding: 10px;
                  text-align: center;
                  font-size: 12px;
                  color: #666666;
                }
                .footer a {
                  color: #1b7a43; /* Dark Green */
                  text-decoration: none;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  Krishi Seva
                </div>
                <div class="content">
                  <p>Dear ${name},</p>
                  <p>Thank you for signing up with Krishi Seva! We're thrilled to have you on board and are excited to support you with all your farming needs. Our platform offers a range of services and tools designed to help you succeed in your agricultural endeavors.</p>
                  
                  <p>We are committed to providing you with the best resources and support. If you have any questions or require assistance, please do not hesitate to reach out to our support team.</p>
                  <p>Thank you once again for choosing Krishi Seva. We look forward to supporting your journey and helping you achieve your agricultural goals.</p>
                </div>
                <div class="cta">
                  <p>Visit us at <a href="http://www.krishiseva.co" target="_blank" rel="noopener noreferrer">www.krishiseva.co</a> for more information and updates.</p>
                </div>
                <div class="footer">
                  <p>&copy; 2024 Krishi Seva. All rights reserved.</p>
                  <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
                </div>
              </div>
            </body>
            </html>
            `,  // HTML content
          });
          


        const token=createToken(user._id);
        res.status(202).json({
            message:"Verified token",
            success:true,
            token:token,
            userId:user._id,
            data:user
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
        console.log(generateOtp);
        const transporter = nodemailer.createTransport({
            service:'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // Use `true` for port 465, `false` for all other ports
            auth: {
              user: "krishiseva27@gmail.com",
              pass: APP_PASS,
            },
          });

          const info = await transporter.sendMail({
            from: "krishiseva@gmail.com", 
            to: email, // list of receivers
            subject: "New Otp generated", // Subject line
            html: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OTP Email</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #1b7a43; /* Dark Green */
      color: #ffffff;
      padding: 20px;
      text-align: center;
      font-size: 28px;
      font-weight: bold;
    }
    .content {
      padding: 20px;
    }
    .otp {
      font-size: 24px;
      font-weight: bold;
      color: #1b7a43; /* Dark Green */
      background-color: #eaf5ea; /* Light Green Background */
      padding: 10px;
      border-radius: 5px;
      display: inline-block;
    }
    .footer {
      background-color: #f1f1f1;
      padding: 10px;
      text-align: center;
      font-size: 12px;
      color: #666666;
    }
    .footer a {
      color: #1b7a43; /* Dark Green */
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      Krishi Seva
    </div>
    <div class="content">
      <p>Dear User,</p>
      <p>Below is your One-Time Password (OTP) which you can use to complete the sign-up or sign-in process:</p>
      <p class="otp">${generateOtp}</p>
      <p>Please use this OTP promptly to access your account. For your security, do not share this OTP with anyone else. If you did not request this OTP, please disregard this email.</p>
      <p>For any queries or assistance, feel free to contact our support team. We are here to help you.</p>
      <p>Thank you for choosing Krishi Seva. We look forward to serving you.</p>
    </div>
    <div class="footer">
      <p>&copy; 2024 Krishi Seva. All rights reserved.</p>
      <p><a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a></p>
    </div>
  </div>
</body>`, // html body
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
            otp:generateOtp,
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

const verifyOtp = async (req, res) => {
  const { otp } = req.body;

  try {
      const user = await userModel.findOne({ otp });
      if (!user) {
          return res.status(404).json({
              message: "Invalid OTP",
              success: false
          });
      }

      // OTP is valid, user can proceed to reset password
      return res.status(200).json({
          
          message: "OTP verified successfully",
          success: true
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message: "Internal Server Error",
          success: false
      });
  }
}

const resetPassword = async (req, res) => {
  const { otp, password } = req.body;

  try {
      const user = await userModel.findOne({ otp });
      if (!user) {
          return res.status(404).json({
              message: "Invalid OTP",
              success: false
          });
      }

      // Hash the new password
      const SALT = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, SALT);

      // Update the password and reset OTP
      user.password = hashedPassword;
      user.otp = 0;
      await user.save();

      return res.status(202).json({
          message: "Password reset successfully",
          success: true
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          message: "Internal Server Error",
          success: false
      });
  }
}

const userService=new UserService();

const updateUser=async(req,res)=>{
  try {
    const user=await userService.updateUser(req.query.id,req.body);
    return res.status(200).json({
      data:user,
      success:true,
      err:{},
      message:"Successfully updated the user info"
    })
  } catch (error) {
    console.log(error);
        res.status(500).json({
            message:"Internal Server error",
            success:false,
            err:error.message,
            data:{}
      })
  }
}

const deleteUser=async(req,res)=>{
  try {
    const user=await userService.deleteUser(req.query.id);
    return res.status(200).json({
      data:user,
      success:true,
      err:{},
      message:"Successfully deleted the account"
    })
  } catch (error) {
    console.log(error);
        res.status(500).json({
            message:"Internal Server error",
            success:false,
            err:error.message,
            data:{}
      })
  }
}

const getUser=async(req,res)=>{
  try {
    const {id}=req.params;
    const user=await userService.getUser(id);
    return res.status(200).json({
      data:user,
      success:true,
      err:{},
      message:"Successfully fetched the user info"
    })
  } catch (error) {
    console.log(error);
        res.status(500).json({
            message:"Internal Server error",
            success:false,
            err:error.message,
            data:{}
      })
  }
}


export {
    loginUser,
    registerUser,
    forget,
    verifyOtp,
    resetPassword,
    updateUser,
    deleteUser,
    getUser
    
}

