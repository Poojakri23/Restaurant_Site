import React, { useState, useEffect } from "react";
import { addReview, getReviewsByDish } from "../api"; // ✅ Ensure correct API function
import "../styles/Menu.css";

const handleReviewSubmit = async (e, dishId) => {
  e.preventDefault();
  const form = e.target;
  const rating = form.rating.value;
  const comment = form.comment.value;

  if (!comment) {
    alert("Please fill in all fields.");
    return;
  }

  try {
    // ✅ Ensure correct API format
    await addReview(dishId, { rating, comment }); // Backend ab alag Review model use kar raha hai
    
    alert("✅ Review submitted!");
    form.reset();
  } catch (err) {
    console.error("❌ Failed to submit review:", err);
    alert("Failed to submit review.");
  }
};

const ReviewSection = ({ dishId }) => {
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
useEffect(() => {
  if (showReviews) {
    getReviewsByDish(dishId)
      .then((data) => {
        console.log("👉 Fetched Reviews from API:", data); // ✅ Debugging ke liye
        setReviews(data);
      })
      .catch((err) => console.error("❌ Error fetching reviews:", err));
  }
}, [showReviews, dishId]);

  return (
    <div className="reviews-container">
      <button className="toggle-btn" onClick={() => setShowReviews((prev) => !prev)}>
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </button>

      {showReviews && (
        <div className="reviews">
          <h4>Reviews:</h4>
          {reviews.length > 0 ? (
            reviews.map((review, i) => (
              <div key={i} className="review">
                {review.rating}⭐ <p>{review.comment}</p>
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
            <textarea name="comment" placeholder="Your comment" required />
            <button type="submit">Submit Review</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;