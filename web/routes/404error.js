import express from "express";
import {
  getErrorInsightsContent,
  updateErrorInsightsSeo,
  createAutoRedirectController,
  autoRedirectListController,
} from "../controllers/404error.js";

export const errorRouter = express.Router();
export const updateErrorInsightsRouter = express.Router();

errorRouter.get("/insights", getErrorInsightsContent);
errorRouter.get("/auto-redirect/list", autoRedirectListController);
errorRouter.post("/auto-redirect/create", createAutoRedirectController);
updateErrorInsightsRouter.post(
  "/update-error-insights",
  updateErrorInsightsSeo
);
