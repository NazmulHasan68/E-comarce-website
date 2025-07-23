import mongoose from "mongoose";

const bandSchema = new mongoose.Schema(
  {
    bandname: { type: String, required: true, trim: true , unique: true },
    logo: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);


export const Band = mongoose.models.Band || mongoose.model("Band", bandSchema);
