const express = require('express');
const { 
  getAssembles, 
  createAssemble, 
  updateAssemble, 
  deleteAssemble, 
  getAssembleById 
} = require('../controllers/assembleController'); // Adjust the path if necessary

const router = express.Router();

// Routes
router.get('/', getAssembles); // Get all assemble items
router.get('/:id', getAssembleById); // Get a single assemble item by ID
router.post('/', createAssemble); // Add a new assemble item
router.put('/:id', updateAssemble); // Update an assemble item by ID
router.delete('/:id', deleteAssemble); // Delete an assemble item by ID

module.exports = router;
