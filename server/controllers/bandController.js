import { Band } from "../models/band_model.js";
import fs from "fs";
import path from "path";

// Create new Band
export const createBand = async (req, res) => {
  try {
    const { bandname, country } = req.body;

    const logoPath = req.file?.path.replace(/\\/g, "/");

    if (!bandname) return res.status(400).json({ error: "Band name is required" });

    const existingBand = await Band.findOne({ bandname });
    if (existingBand)
      return res.status(409).json({ error: "Band name already exists" });

    const band = new Band({ bandname, country, logo:logoPath });
    await band.save();

    res.status(201).json(band);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all Bands
export const getBands = async (req, res) => {
  try {
    const bands = await Band.find().sort({ createdAt: -1 });
    res.json(bands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteBand = async (req, res) => {
  try {
    const { id } = req.params;
    const band = await Band.findById(id);
    if (!band) return res.status(404).json({ error: "Band not found" });

    // Delete the image file if exists
    if (band.logo) {
      // If band.logo already contains 'public/...' path, use it directly without joining
      const filePath = path.isAbsolute(band.logo)
        ? band.logo
        : path.join(process.cwd(), band.logo);

      // Check if file exists before unlinking
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Failed to delete image file:", err.message);
          } else {
            console.log("Deleted image file:", filePath);
          }
        });
      } else {
        console.warn("Image file not found, skipping deletion:", filePath);
      }
    }

    // Delete band document
    await Band.findByIdAndDelete(id);

    res.json({ message: "Band and associated image deleted successfully" });
  } catch (error) {
    console.error("Error deleting band:", error.message);
    res.status(500).json({ error: error.message });
  }
};