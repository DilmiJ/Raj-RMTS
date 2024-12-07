const Breakdown = require('../models/breakdownModel');

// Get all breakdowns
exports.getBreakdowns = async (req, res) => {
  try {
    const breakdowns = await Breakdown.find();
    res.status(200).json(breakdowns);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching breakdowns' });
  }
};

// Get a single breakdown by ID
exports.getBreakdownById = async (req, res) => {
  const { id } = req.params;
  try {
    const breakdown = await Breakdown.findById(id);
    if (!breakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }
    res.status(200).json(breakdown);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve breakdown' });
  }
};

// Add a new breakdown
exports.createBreakdown = async (req, res) => {
  const breakdownData = req.body;
  try {
    const newBreakdown = new Breakdown(breakdownData);
    await newBreakdown.save();
    res.status(201).json(newBreakdown);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save breakdown data', error: error.message });
  }
};

// Update a breakdown by ID
exports.updateBreakdown = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedBreakdown = await Breakdown.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedBreakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }
    res.status(200).json(updatedBreakdown);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update breakdown data', error: error.message });
  }
};

// Delete a breakdown by ID
exports.deleteBreakdown = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBreakdown = await Breakdown.findByIdAndDelete(id);
    if (!deletedBreakdown) {
      return res.status(404).json({ message: 'Breakdown not found' });
    }
    res.status(200).json({ message: 'Breakdown deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete breakdown', error: error.message });
  }
};
