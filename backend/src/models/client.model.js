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
      enum: ["website", "e-commerce", "web-app", "mobile-app"],
      required: true,
    }
  }, { timestamps: true }
);

export const Client = mongoose.model("Client", clientSchema);