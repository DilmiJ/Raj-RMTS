const mongoose = require('mongoose');

// Define the schema for the quotation
const breakdownSchema = new mongoose.Schema({
  quotationNumber: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  repairDate: { type: Date, required: true },
  systemDetails: { type: String, required: true },
  jobDoneBy: {
    name: { type: String, required: true },
    number: { type: String, required: true },
  },
  newItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ],
  oldItems: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    }
  ]
});

// Check if the model is already defined, if not define it
const Quotation = mongoose.models.Quotation || mongoose.model('Quotation', breakdownSchema);

module.exports = Quotation;
