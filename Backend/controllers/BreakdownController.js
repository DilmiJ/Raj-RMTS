const Quotation = require('../models/breakdownModel');

// Save a new quotation
exports.saveQuotation = async (req, res) => {
  const { invoiceNumber, repairDate, systemDetails, jobDoneBy, newItems, oldItems } = req.body;

  try {
    // Create a new quotation document
    const newQuotation = new Quotation({
      invoiceNumber,
      repairDate,
      systemDetails,
      jobDoneBy,
      newItems,
      oldItems,
    });

    // Save to the database
    await newQuotation.save();
    res.status(201).json({ message: 'Quotation saved successfully', quotation: newQuotation });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save quotation', error: error.message });
  }
};
