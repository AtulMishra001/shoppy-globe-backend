import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";
import productRoutes from "./src/routes/products.js";

// Load environment variables
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Allow JSON data in requests
app.use(cors());
// Using imported Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} \nhttp://localhost:${PORT}`);
});
