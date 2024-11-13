const Assemble = require('../models/assembleModels'); // Import the model

// Create a new assemble item
exports.createAssemble = async (req, res) => {
    try {
        const { itemName, itemNumber, stockAvailable, price, specification } = req.body;
        if (!itemName || !itemNumber || !stockAvailable || !price || !specification) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const images = req.files ? req.files.map(file => file.path) : [];
        const newAssemble = new Assemble({ itemName, itemNumber, stockAvailable, price, specification, images });

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
        if (!assemble) return res.status(404).send({ message: `Assemble item with ID ${id} not found` });

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
        const images = req.files ? req.files.map(file => file.path) : [];

        if (!itemName || !itemNumber || !stockAvailable || !price || !specification) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const updatedData = { itemName, itemNumber, stockAvailable, price, specification, images };
        const updatedAssemble = await Assemble.findByIdAndUpdate(id, updatedData, { new: true });
        if (!updatedAssemble) return res.status(404).send({ message: `Assemble item with ID ${id} not found` });

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
        const deletedAssemble = await Assemble.findByIdAndDelete(id);
        if (!deletedAssemble) return res.status(404).send({ message: `Assemble item with ID ${id} not found` });

        res.status(200).send({ message: `Assemble item with ID ${id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting assemble item:', error);
        res.status(500).send({ message: 'Failed to delete assemble item', error });
    }
};
