const mongoose = require('mongoose');

const repairingSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true, unique: true },
  problem: { type: String, required: true },
  solution: { type: String, required: true },
  items: { type: String, required: true },
  quantity: { type: Number, required: true },
  dateCreated: { type: Date, default: Date.now },
});

const Repairing = mongoose.model('Repairing', repairingSchema);

module.exports = Repairing;
