const mongoose = require('mongoose');

const quotationSchema = new mongoose.Schema({
    quotationNumber: { 
        type: String, 
        required: true, 
        unique: true 
    },
    items: [
        {
            itemName: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, default: 1 },
            total: { type: Number, required: true },
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const Quotation = mongoose.model('Quotation', quotationSchema);

module.exports = Quotation;
