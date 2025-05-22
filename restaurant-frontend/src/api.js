import axios from "axios";

// Create Axios instance with baseURL
const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

// Attach JWT token (if exists) to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});


// ---------------------------
// 📦 AUTH APIs
// ---------------------------
export const registerUser = (formData) => API.post("/auth/register", formData);
export const loginUser = (formData) => API.post("/auth/login", formData);


// ---------------------------
// 🍽️ DISH APIs
// ---------------------------
export const getAllDishes = () => API.get("/dishes");
export const createDish = (formData) => API.post("/dishes", formData);
export const updateDish = (id, formData) => API.put(`/dishes/${id}`, formData);
export const deleteDish = (id) => API.delete(`/dishes/${id}`);
export const getAllUsers = async () => {
  const res = await fetch('http://localhost:5000/api/auth/users'); // Backend route must exist
  return await res.json();
};

// ---------------------------
// 🌟 REVIEW APIs
// ---------------------------
export const addReview = (dishId, reviewData) => API.post(`/reviews/${dishId}`, reviewData);
export const getReviewsByDish = (dishId) => API.get(`/reviews/${dishId}`);


export default API;
