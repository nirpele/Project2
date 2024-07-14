
const mongoose = require("mongoose");

// Define schema for purchases
const purchaseSchema = new mongoose.Schema(
  {
    customerId: String,
    productId: String,
    date: Date,
  },
  { versionKey: false }
);

// Create model for purchases
const Purchase = mongoose.model("purchase", purchaseSchema, "purchases");

module.exports = Purchase;