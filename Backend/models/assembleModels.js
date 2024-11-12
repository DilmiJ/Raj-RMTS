const mongoose = require('mongoose');

const assembleSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemNumber: { type: Number, required: true },
    stockAvailable: { type: Number, required: true },
    price: { type: Number, required: true },
    specification: { type: String, required: true },
    images: { type: [String], default: [] }, // Array to store image paths
});

module.exports = mongoose.model('Assemble', assembleSchema);
