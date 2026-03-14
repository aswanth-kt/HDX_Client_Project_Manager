import mongoose from "mongoose";
import { Project } from "../models/project.model.js";
import { json } from "express";


export const createProject = async (req, res) => {
  try {

    const { name, client, assignedTo, deadline, description } = req.body;

    if (!name || !client || !assignedTo || !deadline) {
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
};


export const getProjects = async (req, res) => {
  try {

    const { search } = req.query;
    console.log("search", search)

    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10 , 20);
    const skip = (page - 1) * limit;

    let filter = {};

    if (search) {
      filter = {
        $or: [
          { status: {$regex: search, $options: "i" } },
          { name: {$regex: search, $options: "i" } },
        ]
      }
    }
    console.log("filter:", filter.$or)

    // if (name && name.trim()) filter.name = { $regex: name, $options: "i" };
    // if (status && status.trim()) filter.status = { $regex: status, $options: "i" };

    const projects = await Project.find(filter)
    .populate("client", "name")
    .populate("assignedTo", "name")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    // console.log("projects:", projects)

    const totalProjects = await Project.countDocuments(filter);

    return res.status(200).json({
      success: true,
      page,
      projects,
      totalPages: Math.ceil(totalProjects / limit),
      totalProjects,
      message: "Projects fetched"
    })
    
  } catch (error) {
    console.error(error?.message)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};