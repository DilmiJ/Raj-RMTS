const Service = require('../models/Service');

// Create a new service
exports.createService = async (req, res) => {
  try {
    console.log('Request received:', req.body); // Debugging
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Get all services
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Get service by invoice number
exports.getServiceByInvoice = async (req, res) => {
  try {
    const service = await Service.findOne({ invoiceNumber: req.params.invoiceNumber });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(service);
  } catch (error) {
    console.error('Error fetching service:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Update service
exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json(service);
  } catch (error) {
    console.error('Error updating service:', error.message);
    res.status(400).json({ message: error.message });
  }
};

// Delete service
exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    res.status(200).json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error.message);
    res.status(400).json({ message: error.message });
  }
};
