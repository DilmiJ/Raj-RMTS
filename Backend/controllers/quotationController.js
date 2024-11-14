const Quotation = require('../models/Quotation');

exports.createQuotation = async (req, res) => {
    try {
        const { invoiceNumber, items, totalAmount } = req.body;

        const newQuotation = new Quotation({
            invoiceNumber,
            items,
            totalAmount
        });

        await newQuotation.save();
        res.status(201).json(newQuotation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};