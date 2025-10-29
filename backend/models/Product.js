import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  stock: Number,
  image: String,
  artisanId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

export default mongoose.model("Product", productSchema);
