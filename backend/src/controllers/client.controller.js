import mongoose from "mongoose";
import { Client } from "../models/client.model.js";


export const addClient = async (req, res) => {
  try {

    const { name, company, email, phone, projectType } = req.body;

    if (!name || !company || !email || !phone || !projectType) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    };

    const clientExists = await Client.findOne({ email });

    if (clientExists) {
      return res.status(400).json({
        success: false,
        message: "A client with this email address already exists"
      });
    };

    const client = await Client.create({
      name,
      company,
      email: email?.toLowerCase(),
      phone,
      projectType: projectType,
    });

    if (!client) {
      return res.status(400).json({
        success: false,
        message: "Something went wrong by creating client"
      });
    };

    return res.status(201).json({
      success: true,
      message: "Client created",
      client
    })
    
  } catch (error) {
    console.error("Add client error:", error?.message || error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};


export const getAllClients = async (req, res) => {
  try {

    const { search } = req.query;

    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 10, 20);
    const skip = (page - 1) * limit;

    let filter = {};
    
    if (search) {
      filter = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { company: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } }
        ]
      }
    };
    
    const clients = await Client.find(filter)
    .sort({ createdAt: -1})
    .skip(skip)
    .limit(limit);

    // console.log("clients:", clients)

    const totalClients = await Client.countDocuments(filter);

    return res.status(200).json({
      success: true,
      page,
      totalPage: Math.ceil(totalClients / limit),
      totalClients,
      clients,
      message: "Client fetched successfully",
    })

  } catch (error) {
    console.error(error?.message)
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};


export const updateClient = async (req, res) => {
  try {

    const { name, company, email, phone, projectType } = req.body;
    const { clientId } = req.params;

    if (!clientId || !mongoose.isValidObjectId(clientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client Id"
      })
    };

    const client = await Client.findById(clientId);
 
    // update provided fields
    if (name) client.name = name;
    if (company) client.company = company;
    if (email) client.email = email;
    if (phone) client.phone = phone;
    if (projectType) client.projectType = projectType;

    await client.save();

    return res.status(200).json({
      success: true,
      message: "Client updated successfully"
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
};


export const deleteClient = async (req, res) => {
  try {

    const { clientId } = req.params;

    if (!mongoose.isValidObjectId(clientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid client Id"
      })
    };

    const deletedClient = await Client.findByIdAndDelete(clientId);

    if (!deletedClient) {
      return res.status(404).json({
        success: false,
        message: "Client not found"
      })
    };

    console.log("Deleted client:", deletedClient)

    return res.status(200).json({
      success: true,
      message: "Successfully deleted"
    })
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}