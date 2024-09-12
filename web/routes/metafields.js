import express from "express";
import { MetafieldTest } from "../controllers/metafields.js";

const router = express.Router();

router.get("/test", MetafieldTest);

export default router;
