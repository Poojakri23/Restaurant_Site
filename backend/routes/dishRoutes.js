import express from "express";

import {
  getAllDishes,
  createDish,
  updateDish,
  deleteDish,
  getDishById,
} from "../controllers/dishController.js";

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public Routes
router.get("/", getAllDishes);
router.get("/:id", getDishById);

// Admin Routes
router.post("/", protect, adminOnly, createDish);
router.put("/:id", protect, adminOnly, updateDish);
router.delete("/:id", protect, adminOnly, deleteDish);



export default router;