import { User } from "../models/user.model.js";

export const getDevelopers = async (req, res) => {
  try {

    const developers = await User.find();

    if (!developers) {
      return res.status(404).json({
        success: false,
        message: "Developer not found"
      })
    };

    return res.status(200).json({
      success: true,
      developers,
      message: "Fetched developers"
    })
    
  } catch (error) {
    console.error("get dev error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};