const express = require('express');
const { 
  getItems, 
  createItem, 
  updateItem, 
  deleteItem, 
  getItemById 
} = require('../controllers/itemController'); // Adjust the path if necessary

const router = express.Router();

// Routes
router.get('/', getItems); // Get all items
router.get('/:id', getItemById); // Get a single item by ID
router.post('/', createItem); // Add a new item
router.put('/:id', updateItem); // Update an item by ID
router.delete('/:id', deleteItem); // Delete an item by ID

module.exports = router;
