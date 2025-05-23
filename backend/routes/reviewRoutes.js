import express from "express";
const router = express.Router();
import { createDishReview, getDishReviews } from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

// POST /api/reviews/:dishId => Add a review to a dish
router.post("/:dishId", protect, createDishReview);

// GET /api/reviews/:dishId => Get all reviews for a specific dish
router.get("/:dishId", getDishReviews);

export default router;