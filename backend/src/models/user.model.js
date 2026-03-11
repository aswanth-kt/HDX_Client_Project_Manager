import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "developer"],
      default: "developer"
    },
  }, { timestamps: true }
);

// password hasing before saving
userSchema.pre("save", async function () {
  if(!this.isModified("password")) return;

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});


// add method for checking password (compare password)
userSchema.methods.isPasswordCorrect = async function (currentPassword) {
  return await bcrypt.compare(currentPassword, this.password)
};


// generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
  )
};

export const User = mongoose.model("User", userSchema);