import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";



const generateToken = async (id) => {
  try {

    const user = await User.findById(id);
    user.generateAccessToken();

  } catch (error) {
    console.error("Token generate error:", error)
  }
} 

export const registerUser = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    };

    const userExists = await User.findOne({ email });
    // console.log("user exists:", userExists)

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already registerd, Please login"
      });
    };

    const user = await User.create({
      name, 
      email: email?.toLowerCase(), 
      password, 
      role: role?.toLowerCase()
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Error while register user"
      });
    };

    return res.status(201).json({
      success: true,
      messsage: "Successfully registered",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    })
    
  } catch (error) {
    console.error("Registration error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};