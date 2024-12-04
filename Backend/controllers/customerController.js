const Customer = require('../models/customerModel');
//k
// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single customer by ID
exports.getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve customer' });
  }
};

// Add a new customer
exports.createCustomer = async (req, res) => {
  const customerData = req.body;
  try {
    const newCustomer = new Customer(customerData);
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save customer data' });
  }
};

// Update a customer by ID
exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update customer data' });
  }
};

// Delete a customer by ID
exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCustomer = await Customer.findByIdAndDelete(id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(200).json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete customer' });
  }
};
