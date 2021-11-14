import express from "express";
import {
  login,
  getProfile,
  register,
  updateProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.route("/").get(protect, isAdmin, getUsers).post(register);
router.route("/profile").get(protect, getProfile).put(protect, updateProfile);
router
  .route("/:id")
  .delete(protect, isAdmin, deleteUser)
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser);

export default router;
