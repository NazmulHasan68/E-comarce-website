import { Category } from "../models/category_mode.js";


export const createCategory = async (req, res) => {
  try {
    const { category } = req.body;
    const icon = req.file?.path || null;

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
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
