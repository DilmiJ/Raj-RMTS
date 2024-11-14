const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    quotationNumber: { type: String, required: true },
    items: [
        {
            itemName: String,
            itemNumber: String,
            quantity: Number,
            total: Number
        }
    ]
});

module.exports = mongoose.model('Quotation', quotationSchema);
