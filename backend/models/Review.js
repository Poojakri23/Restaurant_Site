 const mongoose = require("mongoose");
 const reviewSchema = new mongoose.Schema({
 dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
 user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 rating: { type: Number, min: 1, max: 5 },
 comment: String,
 }, { timestamps: true });
 export default mongoose.model("Review", reviewSchema)