import Dish from "../models/Dish.js"

// GET /api/dishes (public)
export const getAllDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.json(dishes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/dishes/:id
export const getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    res.json(dish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/dishes (admin only)
export const createDish = async (req, res) => {
  const { name, image, price, description, category } = req.body;

  if (!name || !image || !price) {
    return res.status(400).json({ message: "Name, image and price are required" });
  }

  try {
    const dish = await Dish.create({ name, image, price, description, category });
    res.status(201).json(dish);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/dishes/:id (admin only)
export const updateDish = async (req, res) => {
  const { name, image, price, description, category } = req.body;

  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });

    dish.name = name || dish.name;
    dish.image = image || dish.image;
    dish.price = price || dish.price;
    dish.description = description || dish.description;
    dish.category = category || dish.category;

    const updatedDish = await dish.save();
    res.json(updatedDish);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /api/dishes/:id (admin only)
export const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    if (!dish) return res.status(404).json({ message: "Dish not found" });

    await dish.deleteOne();
    res.json({ message: "Dish deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
