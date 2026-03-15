import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";



const generateToken = async (id) => {
  try {

    const user = await User.findById(id);
    return user.generateAccessToken();

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
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: await generateToken(user._id)
      }
    })
    
  } catch (error) {
    console.error("Registration error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter email or password"
      });
    };

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    };

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    };

    const accessToken = await generateToken(user._id);

    const loggedinUser = await User.findById(user._id)
    .select("-password");

    const options = {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    res.cookie("accessToken", accessToken, options)

    return res.status(200)
    .json({
      success: true,
      message: "Loggedin successfully",
      loggedinUser
    })
    
  } catch (error) {
    console.error("Login error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};


export const getMe = async (req, res) => {
  try {

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const user = await User.findById(req?.user?._id)
    .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "fetched user",
      user
    })
    
  } catch (error) {
    console.error("getme error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};


export const logout = async (req, res) => {
  try {

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    return res.status(200).json({
      success: true, 
      message: "Logged out"
    })
    
  } catch (error) {
    console.error("Logout error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}