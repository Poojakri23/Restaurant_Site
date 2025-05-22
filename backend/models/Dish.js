import mongoose from "mongoose";
 const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
   image: {
     type: String, // ✅ Accepts both URLs & local paths
     required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: String,
      default: "General",
    },
  },
 
  {
    timestamps: true,
  }
 );
 export default mongoose.model("Dish", dishSchema);