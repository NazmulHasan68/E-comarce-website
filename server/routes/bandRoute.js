import express from "express";
import { upload } from "../middlewares/upload.js";
import { createBand, deleteBand, getBands } from "../controllers/bandController.js";

const router = express.Router();

router.post("/", upload.single("logo"), createBand);
router.get("/", getBands);
router.delete("/:id", deleteBand);

export default router;
