const express = require('express');
const itemController = require('../controllers/itemController'); // Ensure this path is correct

const router = express.Router();

// Define routes
router.get('/', itemController.getItems); // Get all items
router.get('/:id', itemController.getItemById); // Get a single item by ID
router.post('/', itemController.createItem); // Add a new item
router.put('/:id', itemController.updateItem); // Update an item
router.delete('/:id', itemController.deleteItem); // Delete an item

module.exports = router;
