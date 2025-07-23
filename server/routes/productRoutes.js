import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);

router.post("/create", upload.array("images", 5), createProduct);
router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;
