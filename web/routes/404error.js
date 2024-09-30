import express from "express";
import {
  getErrorInsightsContent,
  updateErrorInsightsSeo,
  updateImageSeoAltController,
} from "../controllers/404error.js";

const router = express.Router();

router.get("/insights", getErrorInsightsContent);
router.post("/update-error-insights", updateErrorInsightsSeo);
router.post("/update-article-image-alt", updateImageSeoAltController);

export default router;
