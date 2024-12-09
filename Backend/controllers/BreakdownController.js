const Quotation = require("../models/breakdownModel");

exports.saveQuotation = async (req, res) => {
  const {
    quotationNumber,
    invoiceNumber,
    repairDate,
    systemDetails,
    jobDoneBy,
    newItems,
    oldItems,
  } = req.body;

  try {
    // Check if all necessary fields are present
    if (!quotationNumber || !invoiceNumber || !repairDate || !systemDetails || !jobDoneBy || !newItems || !oldItems) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new quotation instance
    const newQuotation = new Quotation({
      quotationNumber,
      invoiceNumber,
      repairDate,
      systemDetails,
      jobDoneBy,
      newItems,
      oldItems,
    });

    // Save to the database
    await newQuotation.save();
    res.status(201).json({
      message: "Quotation saved successfully",
      quotation: newQuotation,
    });
  } catch (error) {
    console.error("Error saving quotation:", error.message); // Log detailed error
    res.status(500).json({
      message: "Failed to save quotation",
      error: error.message,
    });
  }
};
