import express from "express";
import {
  BulkUpdateAltText,
  BulkUpdateFileName,
} from "../controllers/image.optimizer.js";

const router = express.Router();

router.get("/alt-text", BulkUpdateAltText);
router.post("/file-name", BulkUpdateFileName);

export default router;
