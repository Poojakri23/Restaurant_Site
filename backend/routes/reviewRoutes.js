import express from "express";
const router = express.Router();
import Dish from "../models/Dish.js";
// POST /api/reviews/:dishId => Add a review to a dish
router.post('/:dishId', async (req, res) => {
  try {
    const { dishId } = req.params;
    const { rating, comment } = req.body;

    const dish = await Dish.findById(dishId);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });

    const newReview = {
      rating,
      comment,
    };
    console.log(dish)
    // dish.reviews.push(newReview);
    await dish.save();

    res.status(201).json({ message: 'Review added successfully', dish });
  } catch (error) {
    console.error("🔥 Error adding review:", error);
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
});


// GET /api/reviews/:dishId => Get all reviews for a specific dish
router.get('/:dishId', async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.dishId);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });

    res.json(dish.reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error: error.message });
  }
});

export default router;
