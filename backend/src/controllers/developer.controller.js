import mongoose from "mongoose";
import { Project } from "../models/project.model.js";
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


export const getAssignedProjects = async (req, res) => {
  try {

    const userId = req.user?._id;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Id"
      })
    };

    // const assignedProjects = await Project.aggregate([
    //   {
    //     $match: {
    //       assignedTo: id
    //     }
    //   }
    // ]);

    const assignedProjects = await Project.find({
      assignedTo: userId
    })
    .populate("client", "name");

    // console.log("assigned projects:", assignedProjects)

    if (!assignedProjects.length) {
      return res.status(404).json({
        success: false,
        message: "Assigned projects not found"
      })
    };

    return res.status(200).json({
      success: true,
      message: "Assigned project fetched",
      assignedProjects
    })
    
  } catch (error) {
    console.error("get assigned project error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}


export const editProjectStatus = async (req, res) => {
  try {

    const { id } = req.params;
    const { status } = req.body;
    console.log(id, status)

    if (!status || !status.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please give status of your project"
      })
    };

    const project = await Project.findByIdAndUpdate(
      id,
      { status },
      { returnDocument: "after" }
    );

    return res.status(200).json({
      success: true,
      status: project.status,
      message: `Status updated to ${project.status}`
    })
    
  } catch (error) {
    console.error("edit status error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}