import fs from "fs";
import path from "path";
import { Hero } from "../models/Hero_model.js";

// Create new hero
export const createHero = async (req, res) => {
  try {
    const { title, subtitle, isAds, link } = req.body;

    const banner = req.file?.path.replace(/\\/g, "/");

    if (!title || !subtitle || !isAds) return res.status(400).json({ error: "Tile and subtile is required" });

    const hero = new Hero({ title, subtitle, link, isAds, banner });
    await hero.save();

    res.status(201).json(hero);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all Hero
export const getHero = async (req, res) => {
  try {
    const Heros = await Hero.find().sort({ createdAt: -1 });
    res.json(Heros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const deleteHero = async (req, res) => {
  try {
    const { id } = req.params;
    const hero = await Hero.findById(id);
    if (!hero) return res.status(404).json({ error: "Hero not found" });

    if (hero.banner) {
      const filePath = path.isAbsolute(hero.banner)
        ? hero.banner
        : path.join(process.cwd(), hero.banner);

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
    await Hero.findByIdAndDelete(id);

    res.json({ message: "Band and associated image deleted successfully" });
  } catch (error) {
    console.error("Error deleting band:", error.message);
    res.status(500).json({ error: error.message });
  }
};