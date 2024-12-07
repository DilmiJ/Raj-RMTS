const express = require('express');
const {
  getBreakdowns,
  createBreakdown,
  updateBreakdown,
  deleteBreakdown,
  getBreakdownById
} = require('../controllers/BreakdownController'); // Adjust the path if necessary

const router = express.Router();

// Routes
router.get('/', getBreakdowns); // Get all breakdown quotations
router.get('/:id', getBreakdownById); // Get a single breakdown quotation by ID
router.post('/', createBreakdown); // Add a new breakdown quotation
router.put('/:id', updateBreakdown); // Update a breakdown quotation by ID
router.delete('/:id', deleteBreakdown); // Delete a breakdown quotation by ID

module.exports = router;
