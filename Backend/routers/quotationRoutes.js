const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const quotationController = require('../controllers/quotationController');

// Route to create a quotation
router.post('/', quotationController.createQuotation);

// Route to get all quotations
router.get('/', quotationController.getQuotations);

// Route to delete a specific quotation by ID
router.delete('/:id', quotationController.deleteQuotation);
=======
const { saveQuotation } = require('../controllers/quotationController');

// Define the route correctly
router.post('/save', saveQuotation);
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa

module.exports = router;
