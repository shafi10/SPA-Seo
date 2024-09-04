import express from "express";
import {
  updateCollectionSEO,
  getCollectionsController,
} from "../controllers/collections.js";

const router = express.Router();

router.get("/list", getCollectionsController);
router.post("/update-collection-seo", updateCollectionSEO);

export default router;
