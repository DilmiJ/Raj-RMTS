const Quotation = require('../models/quotationModel');

// Controller function to save quotation
exports.createQuotation = async (req, res) => {
    try {
        const { quotationNumber, items } = req.body;

        // Validate data
        if (!quotationNumber || !items || items.length === 0) {
            return res.status(400).json({ message: 'Quotation number and items are required.' });
        }

        // Check if the quotation number already exists
        const existingQuotation = await Quotation.findOne({ quotationNumber });
        if (existingQuotation) {
            return res.status(400).json({ message: 'Quotation number already exists.' });
        }

        // Create a new quotation
        const newQuotation = new Quotation({
            quotationNumber,
            items
        });

        // Save the quotation to the database
        const savedQuotation = await newQuotation.save();
        return res.status(201).json({ message: 'Quotation saved successfully!', data: savedQuotation });
    } catch (error) {
        console.error('Error creating quotation:', error);
        return res.status(500).json({ message: 'Error creating quotation', error });
    }
};

// Get all quotations
exports.getQuotations = async (req, res) => {
    try {
        const quotations = await Quotation.find();
        res.status(200).json(quotations);
    } catch (error) {
        console.error('Error fetching quotations:', error);
        res.status(500).json({ message: 'Error fetching quotations', error });
    }
};

// Delete a quotation by ID
exports.deleteQuotation = async (req, res) => {
    try {
        const { id } = req.params;
        await Quotation.findByIdAndDelete(id);
        res.status(200).json({ message: 'Quotation deleted successfully' });
    } catch (error) {
        console.error('Error deleting quotation:', error);
        res.status(500).json({ message: 'Error deleting quotation', error });
    }
};
