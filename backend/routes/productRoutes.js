import express from "express";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";
import {
  getProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, isAdmin, createProduct);
router.route("/top").get(getTopProducts);
router.route("/:id/reviews").post(protect, createReview);
router
  .route("/:id")
  .get(getProduct)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);

export default router;
