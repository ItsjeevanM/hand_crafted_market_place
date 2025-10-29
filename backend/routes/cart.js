import express from "express";
import Cart from "../models/Cart.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get cart
router.get("/", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
  res.json(cart || { items: [] });
});

// Add to cart
router.post("/add", verifyToken, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

  const index = cart.items.findIndex(i => i.productId.toString() === productId);
  if (index > -1) cart.items[index].quantity += quantity;
  else cart.items.push({ productId, quantity });

  await cart.save();
  res.json(cart);
});

export default router;
