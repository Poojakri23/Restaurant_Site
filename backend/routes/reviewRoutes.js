import express from "express";
const router = express.Router();

// POST /api/reviews/:dishId => Add a review to a dish
router.post('/:dishId', async (req, res) => {
  try {
    const { dishId } = req.params;
    const { user, rating, comment } = req.body;

    const dish = await Dish.findById(dishId);
    if (!dish) return res.status(404).json({ message: 'Dish not found' });

    // Add the review to the dish
    const newReview = {
      user: user || 'Anonymous',
      rating,
      comment,
    };

    dish.reviews.push(newReview);
    await dish.save();

    res.status(201).json({ message: 'Review added successfully', dish });
  } catch (error) {
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
