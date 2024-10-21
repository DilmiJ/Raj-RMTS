const Customer = require('../models/customerModel');// fronten code -form fully -get

// Get all customers customer ist get 
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new customer form funtion 
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

// Delete a customer
exports.deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    await Customer.findByIdAndDelete(id);
    res.status(200).json({ message: 'Customer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete customer' });
  }
};
