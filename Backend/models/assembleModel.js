const mongoose = require('mongoose'); // Import mongoose

// Define the assemble schema
const assembleSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemNumber: {
        type: String,
        required: true,
        unique: true, // Ensures item numbers are unique
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
    images: {
        type: [String], // Array of image URLs
        required: true,
    }
});

// Create the model
const Assemble = mongoose.model('Assemble', assembleSchema);

// Export the model
module.exports = Assemble;
