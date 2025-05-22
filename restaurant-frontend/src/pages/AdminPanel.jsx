import React, { useEffect, useState } from "react";
import "../styles/AdminPanel.css";
import {
  createDish,
  getAllDishes,
  deleteDish as deleteDishApi,
} from "../api";

const AdminPanel = () => {
  const [dishes, setDishes] = useState([]);
  const [newDish, setNewDish] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    image: "", // ✅ Now supports both URL & local paths
  });

  // ✅ Fetch dishes from backend
  const fetchDishes = async () => {
    try {
      const res = await getAllDishes();
      setDishes(res.data || []);
    } catch (err) {
      console.error("❌ Error fetching dishes:", err);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setNewDish({ ...newDish, [e.target.name]: e.target.value });
  };


  
  // ✅ Add new dish (handles both image URLs & local images)
  const addDish = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        name: newDish.name,
        category: newDish.category,
        description: newDish.description,
        price: newDish.price,
        image:newDish.image, // ✅ Valid image path (URL or local)
      };

      await createDish(formData);
      alert("✅ Dish added successfully!");
      setNewDish({ name: "", category: "", description: "", price: "", image: "" });

      fetchDishes();
    } catch (err) {
      console.error("❌ Error adding dish:", err);
      alert("Failed to add dish.");
    }
  };

  // ✅ Delete dish function
  const handleDelete = async (id) => {
    try {
      await deleteDishApi(id);
      fetchDishes();
    } catch (err) {
      console.error("❌ Error deleting dish:", err);
      alert("Failed to delete dish.");
    }
  };

  return (
    <div className="admin-container">
      <h1>🍽 Admin Panel</h1>

      <form onSubmit={addDish} className="admin-form">
        <input name="name" placeholder="Dish Name" value={newDish.name} onChange={handleChange} required />

        <input name="description" placeholder="Description" value={newDish.description} onChange={handleChange} required />
        
        {/* ✅ Category Selection */}
        <select name="category" value={newDish.category} onChange={handleChange} required>
          <option value="">Select a category</option>
          <option value="Drinks">Drinks</option>
          <option value="Deserts">Deserts</option>
          <option value="MainCourse">MainCourse</option>
          <option value="Veg-Special">Veg-Special</option>
          <option value="Non-Veg">Non-Veg</option>
        </select>

        <input name="price" type="number" placeholder="Price" value={newDish.price} onChange={handleChange} required />

       {/* ✅ Image Input (Opens file explorer to select image) */}
       <input
         type="file"
          accept="image/*"
          onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
             const imageUrl = URL.createObjectURL(file); // creates a temporary local image URL
            setNewDish({ ...newDish, image: imageUrl });
               }
             }}
       />


        <button type="submit">Add Dish</button>
      </form>

      {/* ✅ Dish List */}
      <div className="dish-list">
        {dishes.map((dish) => (
          <div key={dish._id} className="dish-card">
            {/* ✅ Display Image (Checks URL or Local File) */}
           <img src={dish.image} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>{dish.category}</p>
            <p>{dish.description}</p>
            <p>₹{dish.price}</p>
            <button onClick={() => handleDelete(dish._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;