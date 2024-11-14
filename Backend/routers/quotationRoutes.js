const express = require('express');
const router = express.Router();
const { createQuotation } = require('../controllers/quotationController');

router.post('/quotation', createQuotation);

module.exports = router;