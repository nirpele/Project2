const express = require('express');
const productsService = require('../services/productsService');
const { authenticateToken }  = require("../services/authService");


const router = express.Router();

// Entry point: http://localhost:3000/products

// Get All Products (with filter)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const filters = req.query;
    const products = await productsService.getAllProducts(filters);
    res.send(products);
  } catch (error) {
    res.send(error);
  }
});

// Get All Cities
router.get('/cities',authenticateToken, async (req, res) => {
  try {
    const cities = await productsService.getAllCities();
    res.send(cities);
  } catch (error) {
    res.send(error);
  }
});

// Get Product by ID
router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsService.getById(id);
    res.send(product);
  } catch (error) {
    res.send(error);
  }
});

// Add a new product
router.post('/',authenticateToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await productsService.addProduct(obj);
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
});

// Update a product
router.put('/:id',authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await productsService.updateProduct(id, obj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Delete a product
router.delete('/:id',authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await productsService.deleteProduct(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
