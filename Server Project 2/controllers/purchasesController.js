const express = require('express');
const purchasesService = require('../services/purchasesService');
const { authenticateToken }  = require("../services/authService");
const router = express.Router();

// Entry point: http://localhost:3000/purchases

// Get All Purchases (with filter)
router.get('/',authenticateToken, async (req, res) => {
  try {
    const filters = req.query;
    const purchases = await purchasesService.getAllPurchases(filters);
    res.send(purchases);
  } catch (error) {
    res.send(error);
  }
});


// Get Purchase by ID
router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const purchase = await purchasesService.getById(id);
    res.send(purchase);
  } catch (error) {
    res.send(error);
  }
});

// Add a new purchase
router.post('/',authenticateToken, async (req, res) => {
  try {
    const obj = req.body;
    const result = await purchasesService.addPurchase(obj);
    res.status(201).send(result);
  } catch (error) {
    res.send(error);
  }
});

// Update a purchase
router.put('/:id',authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const obj = req.body;
    const result = await purchasesService.updatePurchase(id, obj);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

// Delete a purchase
router.delete('/:id',authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await purchasesService.deletePurchase(id);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;