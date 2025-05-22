import express from "express";
import cors from "cors";
import  dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import dishRoutes from "./routes/dishRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
 
 dotenv.config();
 const app = express();
 app.use(express.json());
 app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend
  credentials: true               // if using cookies/sessions
}));

mongoose.connect(process.env.MONGODB_URL).then(()=>
  console.log("Mongo db connected")
).catch(err=>console.log(err));
 
 // Routes
 app.use("/api/auth", authRoutes);
 app.use("/api/dishes", dishRoutes);
 app.use("/api/reviews", reviewRoutes);
 
 const PORT = process.env.PORT || 5000;
 app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
 });