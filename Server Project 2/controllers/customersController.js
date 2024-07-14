const express = require("express");
const customersService = require("../services/customersService");
const { authenticateToken }  = require("../services/authService");
const router = express.Router();

// Entry point: http://localhost:3000/customers

// Get All Customers (with filter)
router.get("/", authenticateToken, async (req, res) => {
  try {
    // If the control reaches here, it means the token was successfully verified
    const filters = req.query;
    const customers = await customersService.getAllCustomers(filters);
    res.send(customers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Get All Cities
router.get("/cities", async (req, res) => {
  try {
      const cities = await customersService.getAllCities();
      res.send(cities);
  } catch (error) {
    res.status(500).send(error.message);  }
});

// Get Customer by ID
router.get("/:id", authenticateToken, async (req, res) => {
  try {
   
      const { id } = req.params;
      const customer = await customersService.getById(id);
      res.send(customer);
    
  } catch (error) {
    res.status(500).send(error.message);  }
});

// Add a new customer
router.post("/",authenticateToken, async (req, res) => {
  try {
   
      const obj = req.body;
      const result = await customersService.addCustomer(obj);
      res.status(201).send(result);
    
  } catch (error) {
    res.status(500).send(error.message);  }
});

// Update a customer
router.put("/:id", authenticateToken, async (req, res) => {
  try {
   
      const { id } = req.params;
      const obj = req.body;
      const result = await customersService.updateCustomer(id, obj);
      res.send(result);
    
  } catch (error) {
    res.status(500).send(error.message);  }
});

// Delete a customer
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
   
      const { id } = req.params;
      const result = await customersService.deleteCustomer(id);
      res.send(result);
    
  } catch (error) {
 res.status(500).send(error.message);  }
});

module.exports = router;
