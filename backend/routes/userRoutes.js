import express from "express";
import { login, getProfile, register } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/", register);
router.get("/profile", protect, getProfile);

export default router;
