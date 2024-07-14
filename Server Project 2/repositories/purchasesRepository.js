const Purchase = require('../models/purchaseModel');

// Get All
const getAllPurchases = (filters) => {
  return Purchase.find(filters);
};

// Get By ID
const getById = (id) => {
  return Purchase.findById(id);
};

// Create
const addPurchase = (obj) => {
  const purchase = new Purchase(obj);
  return purchase.save();
};

// Update
const updatePurchase = (id, obj) => {
  return Purchase.findByIdAndUpdate(id, obj);
};

// Delete
const deletePurchase = (id) => {
  return Purchase.findByIdAndDelete(id);
};

module.exports = {
  getAllPurchases,
  getById,
  addPurchase,
  updatePurchase,
  deletePurchase,
};