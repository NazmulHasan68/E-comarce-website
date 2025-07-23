import express from "express";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
} from "../controllers/categoryController.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/", upload.single("icon"), createCategory);
router.get("/", getAllCategories);
router.delete("/:id", deleteCategory);

export default router;
