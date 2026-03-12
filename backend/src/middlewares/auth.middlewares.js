import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";


export const verifyJWT = async (req, res, next) => {
  try {

    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      })
    };
  
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Something went wrong in token decode"
      })
    };
  
    const user = await User.findById(decoded._id)
    .select("-password");
  
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid access token"
      })
    };
  
    req.user = user;
  
    next();

  } catch (error) {
    console.error("Verify JWT error:", error?.message || error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    })
  }

}