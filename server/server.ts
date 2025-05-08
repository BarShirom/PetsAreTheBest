import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authMiddleware from "./middleware/authMiddleware";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import categoryRoutes from "./routes/categoryRoutes";
import userRoutes from "./routes/userRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI!;

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);
app.use("/products", authMiddleware, productRoutes);
app.use("/categories", authMiddleware, categoryRoutes);
app.use("/users", authMiddleware, userRoutes);
app.use("/orders", authMiddleware, orderRoutes);

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("🐾 PetsAreTheBest backend is running!");
});
