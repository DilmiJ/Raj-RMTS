const mongoose = require('mongoose');

// Breakdown schema definition
const breakdownSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
        unique: true,
    },
    repairDate: {
        type: Date,
        required: true,
    },
    systemDetails: {
        type: String,
        required: true,
    },
    jobDoneBy: {
        name: {
            type: String,
            required: true,
        },
        number: {
            type: String,
            required: true,
        },
    },
    newlyAddedItems: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    oldQuotationItems: [
        {
            name: {
                type: String,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
});

const Breakdown = mongoose.model('Breakdown', breakdownSchema);

module.exports = Breakdown;
