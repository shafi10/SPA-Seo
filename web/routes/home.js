import express from "express";
import {
  createHomeSEOController,
  getHomeSEOController,
} from "../controllers/home.js";

const router = express.Router();

router.post("/create-home-seo", createHomeSEOController);
router.get("/get-home-seo", getHomeSEOController);

export default router;
