import mongoose, { Schema } from "mongoose";

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    projectType: {
      type: String,
      enum: ["Website", "E-commerce", "Web App", "Mobile App", "Desktop Application", "SaaS Platform", "AI Chatbot", "Job Portal", "Messaging App", "Restaurant Management System"],
      required: true,
    }
  }, { timestamps: true }
);

export const Client = mongoose.model("Client", clientSchema);