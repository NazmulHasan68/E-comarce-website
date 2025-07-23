import { Category } from "../models/category_mode.js";
import fs from "fs";
import path from "path";


export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;

    const icon = req.file?.path.replace(/\\/g, "/");

    if (!category) return res.status(400).json({ error: "Category name is required" });

    const newCategory = new Category({ category, icon });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Use the icon path directly because it already contains "public/"
    const iconPath = category.icon;

    if (iconPath && fs.existsSync(iconPath)) {
      fs.unlinkSync(iconPath);
      console.log("Deleted image:", iconPath);
    } else {
      console.warn("Image file not found:", iconPath);
    }

    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category and image deleted" });
  } catch (err) {
    console.error("Delete error:", err.message);
    res.status(500).json({ error: err.message });
  }
};
