const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    invoiceNumber: {
        type: String,
        required: true,
    },
    items: [
        {
            itemName: {
                type: String,
                required: true,
            },
            itemNumber: {
                type: String,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
            total: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;