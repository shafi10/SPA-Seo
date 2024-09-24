import express from "express";
import {
  getArticleList,
  updateArticleSeo,
  getBlogList,
  getArticleSeoContent,
  getSingleArticle,
  updateImageSeoAltController,
} from "../controllers/blog.js";

const router = express.Router();

router.get("/list", getBlogList);
router.get("/articles/:id", getArticleList);
router.get("/article-seo/:id", getArticleSeoContent);
router.get("/articleById/:blogId/:id", getSingleArticle);
router.post("/update-article-seo", updateArticleSeo);
router.post("/update-article-image-alt", updateImageSeoAltController);

export default router;
