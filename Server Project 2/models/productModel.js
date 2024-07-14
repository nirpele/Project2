const mongoose = require("mongoose");

// Define schema for products
const productSchema = new mongoose.Schema(
  {
    name: String,
    quantity: Number,
    price: Number,
  },
  { versionKey: false }
);

// Create model for products
const Product = mongoose.model("product", productSchema, "products");

module.exports = Product;