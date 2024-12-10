const Repairing = require('../models/Repairing');

// Create a new repairing record
exports.createRepairing = async (req, res) => {
  try {
    const repairing = new Repairing(req.body);
    await repairing.save();
    res.status(201).json(repairing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all repairing records
exports.getAllRepairings = async (req, res) => {
  try {
    const repairings = await Repairing.find();
    res.status(200).json(repairings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get repairing by invoice number
exports.getRepairingByInvoice = async (req, res) => {
  try {
    const repairing = await Repairing.findOne({ invoiceNumber: req.params.invoiceNumber });
    if (!repairing) return res.status(404).json({ message: 'Repairing record not found' });
    res.status(200).json(repairing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update repairing record
exports.updateRepairing = async (req, res) => {
  try {
    const repairing = await Repairing.findOneAndUpdate(
      { invoiceNumber: req.params.invoiceNumber },
      req.body,
      { new: true }
    );
    if (!repairing) return res.status(404).json({ message: 'Repairing record not found' });
    res.status(200).json(repairing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete repairing record
exports.deleteRepairing = async (req, res) => {
  try {
    const repairing = await Repairing.findOneAndDelete({ invoiceNumber: req.params.invoiceNumber });
    if (!repairing) return res.status(404).json({ message: 'Repairing record not found' });
    res.status(200).json({ message: 'Repairing record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
