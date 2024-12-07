const express = require('express');
const quotationController = require('../controllers/BreakdownController');

const router = express.Router();

// Route to save a new quotation
router.post('/save-quotation', quotationController.saveQuotation);

module.exports = router;
