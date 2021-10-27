import express from "express";
import Product from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { getProducts, getProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

export default router;
