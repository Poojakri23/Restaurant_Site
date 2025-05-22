import React, { useEffect, useState } from "react";
import "../styles/Menu.css";
import { getAllDishes } from "../api";
import ReviewSection from "../components/ReviewSection"; // ✅ Import ReviewSection

const Menu = () => {
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

  // ✅ Fetch dishes from backend
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const res = await getAllDishes();
        setDishes(res.data || []);

        // Extract unique categories
        const uniqueCategories = [...new Set(res.data.map((dish) => dish.category))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("❌ Failed to fetch dishes:", err);
      }
    };
    fetchDishes();
  }, []);

  return (
    <section className="menu-section" id="menu">
      <h2 className="menu-title">Our Menu</h2>

       {/* ✅ Image-Based Category Buttons */}
      <div className="category-container">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
            style={{ backgroundImage: `url(/images/${category}.jpg)` }}
          >
            <span className="category-name">{category}</span>
          </button>
        ))}
      </div>


      {/* ✅ Filtered Dishes Display */}
      <div className="menu-grid">
        {selectedCategory
          ? dishes.filter((dish) => dish.category === selectedCategory).map((dish) => (
              <div className="menu-card" key={dish._id}>
                <img src={dish.image} alt={dish.name} />
                <div className="menu-info">
                  <h3>{dish.name}</h3>
                  <p>₹{dish.price}</p>
                </div>

                {/* ✅ Review Section Component */}
                <ReviewSection reviews={dish.reviews} dishId={dish._id} />
              </div>
            ))
          : <p className="select-category-msg">Select a category to view dishes</p>}
      </div>
    </section>
  );
};

export default Menu;