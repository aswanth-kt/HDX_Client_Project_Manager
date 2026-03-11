import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deadLine: {
      type: Date,
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "In Progress", "Compleated"],
      default: "Pending",
    },
    description: String,
  }, { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);