const express = require('express');
const router = express.Router();
const repairingController = require('../controllers/repairingController');

// Routes for CRUD operations
router.post('/', repairingController.createRepairing);
router.get('/', repairingController.getAllRepairings);
router.get('/:invoiceNumber', repairingController.getRepairingByInvoice);
router.put('/:invoiceNumber', repairingController.updateRepairing);
router.delete('/:invoiceNumber', repairingController.deleteRepairing);

module.exports = router;
