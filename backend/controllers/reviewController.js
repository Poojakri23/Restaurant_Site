import Dish from "../models/Dish.js" ;

// POST /api/dishes/:id/reviews
export const createDishReview = async (req, res) => {
  
  const { rating, comment } = req.body;

  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });

    // Check if user already reviewed
    const alreadyReviewed = dish.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: "You have already reviewed this dish" });
    }

    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    dish.reviews.push(review);
    dish.numReviews = dish.reviews.length;
    dish.averageRating =
      dish.reviews.reduce((acc, r) => acc + r.rating, 0) / dish.numReviews;

    await dish.save();
    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
