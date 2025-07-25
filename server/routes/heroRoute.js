import express from "express";
import { upload } from "../middlewares/upload.js";
import { createHero, deleteHero, getHero } from "../controllers/heroController.js";

const router = express.Router();

router.post("/create", upload.single("banner"), createHero);
router.get("/", getHero);
router.delete("/:id", deleteHero);

export default router;
