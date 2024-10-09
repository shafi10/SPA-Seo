import express from "express";
import {
  getErrorInsightsContent,
  updateErrorInsightsSeo,
  updateImageSeoAltController,
} from "../controllers/404error.js";

export const errorRouter = express.Router();
export const updateErrorInsightsRouter = express.Router();

errorRouter.get("/insights", getErrorInsightsContent);
updateErrorInsightsRouter.post(
  "/update-error-insights",
  updateErrorInsightsSeo
);
//next
errorRouter.post("/update-error-redirect", updateImageSeoAltController);
