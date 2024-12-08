const Quotation = require('../models/quotationModel');

// Controller function to save quotation
const saveQuotation = async (req, res) => {
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
        await newQuotation.save();
        return res.status(200).json({ message: 'Quotation saved successfully!', data: newQuotation });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error saving quotation.', error });
    }
};

module.exports = { saveQuotation };
