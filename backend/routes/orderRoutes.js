import express from "express";
import Order from "../models/Product.js";
import asyncHandler from "express-async-handler";
import { isAdmin, protect } from "../middlewares/authMiddleware.js";

import {
  createOrder,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/").get(protect, isAdmin, getOrders).post(protect, createOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/deliver").put(protect, isAdmin, updateOrderToDelivered);

export default router;
