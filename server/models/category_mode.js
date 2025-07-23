import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    category: { type: String, required: true, trim: true },
    icon: { type: String },
  },
  { timestamps: true }
);

export const Category =
  mongoose.models.Category || mongoose.model("Category", CategorySchema);
