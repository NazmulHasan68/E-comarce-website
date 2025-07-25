import fs from "fs";
import path from "path";
import { Product } from "../models/product.model.js";
import slugify from "slugify";
import { upload } from "../middlewares/multer.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Create product with multiple images
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discount,
      stock,
      category,
      band,
      colors,
      sizes,
      madeIn
    } = req.body;

    const images = req.files.map(file => file.filename);

    // Generate slug from title
    const slug = slugify(title, { lower: true, strict: true });

    const product = new Product({
      title,
      slug,  // <--- add slug here
      description,
      price,
      discount,
      band,
      stock,
      category,
      colors: colors ? colors.split(",").map(c => c.trim()) : [],
      sizes: sizes ? sizes.split(",").map(s => s.trim()) : [],
      madeIn,
      isPopular:false,
      isSuggested: false,
      isBestSelling :false,
      images,
    });

    await product.save();

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Delete product and all its images from public/uploads
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Delete each image file
    product.images.forEach((imagePath) => {
      const fullPath = path.join(process.cwd(), "public", imagePath);
      fs.unlink(fullPath, (err) => {
        if (err) console.error("Failed to delete image:", err.message);
      });
    });

    // Delete product document
    await Product.findByIdAndDelete(id);

    res.json({ message: "Product and images deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};










export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      price,
      discount,
      stock,
      category,
      brand,
      colors,
      sizes,
      madeIn,
      isPopular,
      isSuggested,
      isBestSelling,
      existingImages,
    } = req.body;

    // Convert string booleans to actual booleans
    const boolIsPopular = isPopular === "true";
    const boolIsSuggested = isSuggested === "true";
    const boolIsBestSelling = isBestSelling === "true";

    // Parse colors and sizes if sent as comma-separated strings
    const colorsArray = colors ? colors.split(",").map((c) => c.trim()) : [];
    const sizesArray = sizes ? sizes.split(",").map((s) => s.trim()) : [];

    let existingImgsArray = [];
    if (existingImages) {
      if (Array.isArray(existingImages)) {
        existingImgsArray = existingImages;
      } else {
        existingImgsArray = [existingImages];
      }
    }
    const uploadedImages = req.files.map((file) => file.filename);
    const finalImages = [...existingImgsArray, ...uploadedImages];

    // Build updated data object
    const updatedData = {
      title,
      description,
      price: parseFloat(price),
      discount: parseFloat(discount),
      stock: parseInt(stock),
      category,
      brand,
      colors: colorsArray,
      sizes: sizesArray,
      madeIn,
      images: finalImages,
      isPopular: boolIsPopular,
      isSuggested: boolIsSuggested,
      isBestSelling: boolIsBestSelling,
    };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedProduct)
      return res.status(404).json({ message: "Product not found" });

    return res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ error: err.message });
  }
};
