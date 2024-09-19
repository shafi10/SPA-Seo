import express from "express";
import { MetafieldCreate, GetMetafields } from "../controllers/metafields.js";

const router = express.Router();

router.post("/create", MetafieldCreate);
router.get("/", GetMetafields);

export default router;
