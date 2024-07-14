const Customer = require('../models/customerModel');

// Get All
const getAllCustomers = (filters) => {
  return Customer.find(filters);
};

// Get By ID
const getById = (id) => {
  return Customer.findById(id);
};

// Create
const addCustomer = (obj) => {
  const cust = new Customer(obj);
  return cust.save();
};

// Update
const updateCustomer = (id, obj) => {
  return Customer.findByIdAndUpdate(id, obj);
};

// Delete
const deleteCustomer = (id) => {
  return Customer.findByIdAndDelete(id);
};

module.exports = {
  getAllCustomers,
  getById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
