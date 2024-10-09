import express from "express";
import {
  createHomeSEOController,
  getHomeSEOController,
  createSEOSnippetController,
} from "../controllers/home.js";

const router = express.Router();

router.post("/create-home-seo", createHomeSEOController);
router.get("/get-home-seo", getHomeSEOController);
router.get("/create-seo-file", createSEOSnippetController);

export default router;
