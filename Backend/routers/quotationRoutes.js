const express = require('express');
const router = express.Router();
const quotationController = require('../controllers/quotationController');

// Route to create a quotation
router.post('/', quotationController.createQuotation);

// Route to get all quotations
router.get('/', quotationController.getQuotations);

// Route to delete a specific quotation by ID
router.delete('/:id', quotationController.deleteQuotation);

module.exports = router;
