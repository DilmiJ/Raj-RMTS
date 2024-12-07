// models/Service.js
const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  invoiceNumber: { type: String, required: true },
  date: { type: Date, required: true },
  jobDonePerson: { type: String, required: true },
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
