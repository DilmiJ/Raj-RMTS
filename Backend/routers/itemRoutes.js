const express = require('express');
<<<<<<< HEAD
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
=======
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
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa

module.exports = router;
