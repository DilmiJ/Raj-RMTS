// models/Assemble.js
const mongoose = require('mongoose');

const AssembleSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemNumber: {
        type: String,
        required: true,
        unique: true, // Ensure uniqueness
    },
    stockAvailable: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    specification: {
        type: String,
        required: true,
    },
    images: [String], // Array to store image paths/URLs
});

module.exports = mongoose.model('Assemble', AssembleSchema);
