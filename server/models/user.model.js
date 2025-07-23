import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["customer", "admin"],
    default: "customer"
  },
  
  otp: String,
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export const User = mongoose.models.User || mongoose.model("User", userSchema);






