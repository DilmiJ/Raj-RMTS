// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

// Routes for CRUD operations
router.post('/create', serviceController.createService);
router.get('/', serviceController.getAllServices);
router.get('/:invoiceNumber', serviceController.getServiceByInvoice);
router.put('/:id', serviceController.updateService);
router.delete('/:id', serviceController.deleteService);

module.exports = router;
