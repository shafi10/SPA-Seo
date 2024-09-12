import express from "express";
import { MetafieldCreate } from "../controllers/metafields.js";

const router = express.Router();

router.post("/create", MetafieldCreate);

export default router;
