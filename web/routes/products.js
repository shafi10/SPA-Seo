import express from "express";
import {
  updateProductSEO,
  getProductControllerByID,
  getProductHighlightController,
  productsController,
  showOrHideProductHighlightController,
} from "../controllers/products.js";

const router = express.Router();

router.get("/list", productsController);
router.get("/:id", getProductControllerByID);
router.post("/update-product-seo", updateProductSEO);
router.get("/highlight/:id", getProductHighlightController);
router.post("/hide-or-show-highlight", showOrHideProductHighlightController);

export default router;
