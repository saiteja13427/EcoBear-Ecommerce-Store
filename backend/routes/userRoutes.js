import express from "express";
import { login, getProfile, register, updateProfile } from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/", register);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);

export default router;
