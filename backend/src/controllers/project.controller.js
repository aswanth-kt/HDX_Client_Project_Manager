import mongoose from "mongoose";
import { Project } from "../models/project.model.js";


export const createProject = async (req, res) => {
  try {

    const { name, client, assignedTo, deadline, description } = req.body;

    if (!name || !client || !assignedTo || !deadline || !description) {
      return res.status(400).json({
        success: false,
        message: "Required fields missing"
      })
    };

    if (!mongoose.isValidObjectId(client) || !mongoose.isValidObjectId(assignedTo)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client or assigned user"
      });
    }

    const project = await Project.create({
      name,
      client,
      assignedTo,
      deadline,
      description: description ? description : undefined
    });

    console.log("project:", project);

    return res.status(201).json({
      success: true,
      project,
      message: "Project created",
    })
    
  } catch (error) {
    console.error(error?.message)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}