const mongoose = require('mongoose');

<<<<<<< HEAD
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
=======
const QuotationSchema = new mongoose.Schema({
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

const Quotation = mongoose.model('Quotation', QuotationSchema);

module.exports = Quotation;
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
