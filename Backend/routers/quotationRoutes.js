const express = require('express');
const router = express.Router();
const { saveQuotation } = require('../controllers/quotationController');

// Define the route correctly
router.post('/save', saveQuotation);

module.exports = router;
