import express from "express";
import Order from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { protect } from "../middlewares/authMiddleware.js";

import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").post(protect, createOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);

export default router;
