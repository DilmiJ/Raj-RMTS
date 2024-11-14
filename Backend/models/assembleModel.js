const mongoose = require('mongoose');
//k
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
    images: [{
        data: Buffer,
        contentType: String,
    }], // Store images as buffers
});

module.exports = mongoose.model('Assemble', AssembleSchema);
