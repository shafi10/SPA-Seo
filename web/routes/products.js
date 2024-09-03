import express from "express";
import {
  updateProductSEO,
  getProductControllerByID,
  updateImageSeoAltController,
  productsController,
  updateProductBulkSeo,
} from "../controllers/products.js";

const router = express.Router();

router.get("/list", productsController);
router.get("/:id", getProductControllerByID);
router.post("/update-product-seo", updateProductSEO);
router.post("/update-image-alt", updateImageSeoAltController);
router.post("/update-product-bulk-seo", updateProductBulkSeo);

export default router;
