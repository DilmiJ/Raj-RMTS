const express = require('express');
const { getCustomers, createCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController'); // Adjust the path if necessary

const router = express.Router();

// Routes
router.get('/', getCustomers); // Get all customers
router.post('/', createCustomer); // Add a new customer
router.put('/:id', updateCustomer); // Update a customer by ID
router.delete('/:id', deleteCustomer); // Delete a customer by ID

module.exports = router;
