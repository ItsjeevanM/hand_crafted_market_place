import express from "express";
import Product from "../models/Product.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// POST (artisan only)
router.post("/", verifyToken, async (req, res) => {
  if (req.user.role !== "artisan") return res.status(403).json({ message: "Not allowed" });
  const product = new Product({ ...req.body, artisanId: req.user.id });
  await product.save();
  res.json(product);
});

export default router;
