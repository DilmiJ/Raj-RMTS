const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get all items
router.get('/', itemController.getAllItems);

// Add a new item
router.post('/', itemController.createItem);

// Update an item
router.put('/:id', itemController.updateItem);

// Delete an item
router.delete('/:id', itemController.deleteItem);

module.exports = router;
