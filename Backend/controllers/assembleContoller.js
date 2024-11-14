// Import the Assemble model
const Assemble = require('../models/assembleModels');

// Create a new assemble item
exports.createAssemble = async (req, res) => {
    try {
        const { itemName, itemNumber, stockAvailable, price, specification } = req.body;

        // Check if all required fields are provided
        if (!itemName || !itemNumber || !stockAvailable || !price || !specification) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Handle uploaded images if any
        const images = req.files && req.files.length ? req.files.map(file => file.path) : [];

        // Create a new assemble item
        const newAssemble = new Assemble({ itemName, itemNumber, stockAvailable, price, specification, images });

        // Save the new assemble item to the database
        const savedAssemble = await newAssemble.save();
        res.status(201).send({ message: 'Assemble item created successfully', data: savedAssemble });
    } catch (error) {
        console.error('Error creating assemble item:', error);
        res.status(500).send({ message: 'Failed to create assemble item', error });
    }
};

// Get all assemble items
exports.getAssembles = async (req, res) => {
    try {
        const assembles = await Assemble.find();
        res.status(200).send({ message: 'List of assembles', data: assembles });
    } catch (error) {
        console.error('Error fetching assembles:', error);
        res.status(500).send({ message: 'Failed to get assembles', error });
    }
};

// Get assemble item by ID
exports.getAssembleById = async (req, res) => {
    try {
        const { id } = req.params;
        const assemble = await Assemble.findById(id);

        // Check if the item exists
        if (!assemble) {
            return res.status(404).send({ message: `Assemble item with ID ${id} not found` });
        }

        res.status(200).send({ message: 'Assemble item found', data: assemble });
    } catch (error) {
        console.error('Error fetching assemble item by ID:', error);
        res.status(500).send({ message: 'Failed to fetch assemble item', error });
    }
};

// Update an assemble item by ID
exports.updateAssemble = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, itemNumber, stockAvailable, price, specification } = req.body;

        // Check if all required fields are provided
        if (!itemName || !itemNumber || !stockAvailable || !price || !specification) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Handle updated images if any
        const images = req.files && req.files.length ? req.files.map(file => file.path) : [];
        const updatedData = { itemName, itemNumber, stockAvailable, price, specification, images };

        // Update the assemble item
        const updatedAssemble = await Assemble.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedAssemble) {
            return res.status(404).send({ message: `Assemble item with ID ${id} not found` });
        }

        res.status(200).send({ message: `Assemble item with ID ${id} updated successfully`, data: updatedAssemble });
    } catch (error) {
        console.error('Error updating assemble item:', error);
        res.status(500).send({ message: 'Failed to update assemble item', error });
    }
};

// Delete an assemble item by ID
exports.deleteAssemble = async (req, res) => {
    try {
        const { id } = req.params;

        // Delete the assemble item
        const deletedAssemble = await Assemble.findByIdAndDelete(id);
        if (!deletedAssemble) {
            return res.status(404).send({ message: `Assemble item with ID ${id} not found` });
        }

        res.status(200).send({ message: `Assemble item with ID ${id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting assemble item:', error);
        res.status(500).send({ message: 'Failed to delete assemble item', error });
    }
};

// Create or update quotation
exports.createQuotation = async (req, res) => {
    try {
        const { quotationItems, quotationNumber } = req.body;

        // Check if all required fields are provided
        if (!quotationItems || !quotationItems.length || !quotationNumber) {
            return res.status(400).send({ message: 'Quotation number and items are required' });
        }

        // Save quotation details in the database
        const savedQuotation = await Assemble.updateOne(
            { quotationNumber },
            { $set: { quotationItems } },
            { upsert: true, new: true }
        );

        res.status(200).send({ message: 'Quotation saved successfully', data: savedQuotation });
    } catch (error) {
        console.error('Error saving quotation:', error);
        res.status(500).send({ message: 'Failed to save quotation', error });
    }
};

// Export all controller functions
module.exports = {
    createAssemble,
    getAssembles,
    getAssembleById,
    updateAssemble,
    deleteAssemble,
    createQuotation
};
