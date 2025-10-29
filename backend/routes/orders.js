import express from "express";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Place order
router.post("/place", verifyToken, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart || cart.items.length === 0)
    return res.status(400).json({ message: "Cart is empty" });

  const total = cart.items.reduce(
    (sum, item) => sum + item.quantity * 100, // fake price calc for now
    0
  );

  const order = new Order({ userId: req.user.id, items: cart.items, total });
  await order.save();

  await Cart.deleteOne({ userId: req.user.id });

  res.json({ message: "Order placed successfully", order });
});

// View orders
router.get("/", verifyToken, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
  res.json(orders);
});

export default router;
