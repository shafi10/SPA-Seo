import express from "express";
import { getSeoInsightsController } from "../controllers/seoInsights.js";

const router = express.Router();

router.get("/insights", getSeoInsightsController);

export default router;
