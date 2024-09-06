import express from "express";
import {
  updateCollectionSEO,
  getCollectionsController,
  updateCollectionAltTextSEO,
} from "../controllers/collections.js";

const router = express.Router();

router.get("/list", getCollectionsController);
router.post("/update-collection-seo", updateCollectionSEO);
router.post("/update-collection-seo-alt-text", updateCollectionAltTextSEO);

export default router;
