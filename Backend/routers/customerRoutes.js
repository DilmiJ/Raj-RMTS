const express = require('express');
const { getCustomers, createCustomer, deleteCustomer } = require('../controllers/customerController'); // Adjust the path if necessary

const router = express.Router();

// Routes
router.get('/', getCustomers); // Get all customers
router.post('/', createCustomer); // Add a new customer
router.delete('/:id', deleteCustomer); // Delete a customer by ID

module.exports = router;
