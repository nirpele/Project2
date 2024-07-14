const Product = require('../models/productModel');

// Get All
const getAllProducts = (filters) => {
  return Product.find(filters);
};

// Get By ID
const getById = (id) => {
  return Product.findById(id);
};

// Create
const addProduct = (obj) => {
  const product = new Product(obj);
  return product.save();
};

// Update
const updateProduct = (id, obj) => {
  return Product.findByIdAndUpdate(id, obj);
};

// Delete
const deleteProduct = (id) => {
  return Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  getById,
  addProduct,
  updateProduct,
  deleteProduct,
};
