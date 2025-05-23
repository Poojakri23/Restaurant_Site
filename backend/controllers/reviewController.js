import Review from "../models/Review.js";
import Dish from "../models/Dish.js";

// POST /api/reviews/:dishId => Add a review
export const createDishReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const dish = await Dish.findById(req.params.dishId);
    if (!dish) return res.status(404).json({ message: "Dish not found" });

    // Check if user already reviewed
    const alreadyReviewed = await Review.findOne({
      dish: dish._id,
      user: req.user._id,
    });
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this dish" });
    }

    // Naya review create karein
    const review = new Review({
      dish: dish._id,
      user: req.user._id,
      rating: Number(rating),
      comment,
    });

    await review.save(); // Review ko save karein

    // Dish model me numReviews aur averageRating update karein
    const allReviews = await Review.find({ dish: dish._id });
    dish.numReviews = allReviews.length;
    dish.averageRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    await dish.save(); // Dish ko update karein
    res.status(201).json({ message: "Review added successfully", review });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/reviews/:dishId => Fetch all reviews for a dish
export const getDishReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ dish: req.params.dishId }).populate("user", "name");
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ message: "No reviews found" });
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error: error.message });
  }
};