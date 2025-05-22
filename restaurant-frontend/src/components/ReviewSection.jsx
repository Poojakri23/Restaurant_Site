import React from "react";
import { addReview } from "../api"; // ✅ API directly imported
import "../styles/Menu.css";
const handleReviewSubmit = async (e, dishId) => {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const rating = form.rating.value;
  const comment = form.comment.value;

  if (!comment) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    await addReview(dishId, { rating, comment });
    alert("✅ Review submitted!");
    form.reset();
  } catch (err) {
    console.error("❌ Failed to submit review:", err);
    alert("Failed to submit review.");
  }
};

const ReviewSection = ({ reviews, dishId }) => {
  return (
    <div className="reviews">
      <h4>Reviews:</h4>
      {reviews?.length > 0 ? (
        reviews.map((review, i) => (
          <div key={i} className="review">
             {review.rating}⭐
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="no-reviews">No reviews yet</p>
      )}

      {/* ✅ Review Form */}
      <form className="review-form" onSubmit={(e) => handleReviewSubmit(e, dishId)}>
  <select name="rating" defaultValue="5">
    <option value="5">⭐⭐⭐⭐⭐</option>
    <option value="4">⭐⭐⭐⭐</option>
    <option value="3">⭐⭐⭐</option>
    <option value="2">⭐⭐</option>
    <option value="1">⭐</option>
  </select>
  <textarea name="comment" placeholder="Your comment" required></textarea>
  <button type="submit">Submit Review</button>
</form>
    </div>
  );
};

export default ReviewSection;