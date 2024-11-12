const Assemble = require('../models/assembleModels'); // Correct path to the model

// Handle creating a new assemble item
exports.createAssemble = async (req, res) => {
    try {
        const { itemName, itemNumber, stockAvailable, price, specification } = req.body;
        // Ensure all required fields are provided
        if (!itemName || !itemNumber || !stockAvailable || !price || !specification) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        // Handle file uploads (if any)
        const images = req.files ? req.files.map(file => file.path) : [];

        const newAssemble = new Assemble({
            itemName,
            itemNumber,
            stockAvailable,
            price,
            specification,
            images
        });

        const savedAssemble = await newAssemble.save(); // Save the item to the database
        res.status(201).send({ message: 'Assemble item created successfully', data: savedAssemble });
    } catch (error) {
        console.error('Error creating assemble item:', error);
        res.status(500).send({ message: 'Failed to create assemble item', error });
    }
};

// Handle fetching all assemble items
exports.getAssembles = async (req, res) => {
    try {
        const assembles = await Assemble.find(); // Fetch all items from the database
        res.status(200).send({ message: 'List of assembles', data: assembles });
    } catch (error) {
        console.error('Error fetching assembles:', error);
        res.status(500).send({ message: 'Failed to get assembles', error });
    }
};

// Handle fetching an assemble item by ID
exports.getAssembleById = async (req, res) => {
    try {
        const { id } = req.params;
        const assemble = await Assemble.findById(id); // Fetch item by ID
        if (!assemble) {
            return res.status(404).send({ message: `Assemble item with ID ${id} not found` });
        }
        res.status(200).send({ message: 'Assemble item found', data: assemble });
    } catch (error) {
        console.error('Error fetching assemble item by ID:', error);
        res.status(500).send({ message: 'Failed to fetch assemble item', error });
    }
};

// Handle updating an assemble item by ID
exports.updateAssemble = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, itemNumber, stockAvailable, price, specification } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        // Ensure required fields are provided
        if (!itemName || !itemNumber || !stockAvailable || !price || !specification) {
            return res.status(400).send({ message: 'All fields are required' });
        }

        const updatedData = {
            itemName,
            itemNumber,
            stockAvailable,
            price,
            specification,
            images
        };

        const updatedAssemble = await Assemble.findByIdAndUpdate(id, updatedData, { new: true }); // Update the item by ID
        if (!updatedAssemble) {
            return res.status(404).send({ message: `Assemble item with ID ${id} not found` });
        }
        res.status(200).send({ message: `Assemble item with ID ${id} updated successfully`, data: updatedAssemble });
    } catch (error) {
        console.error('Error updating assemble item:', error);
        res.status(500).send({ message: 'Failed to update assemble item', error });
    }
};

// Handle deleting an assemble item by ID
exports.deleteAssemble = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAssemble = await Assemble.findByIdAndDelete(id); // Delete the item by ID
        if (!deletedAssemble) {
            return res.status(404).send({ message: `Assemble item with ID ${id} not found` });
        }
        res.status(200).send({ message: `Assemble item with ID ${id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting assemble item:', error);
        res.status(500).send({ message: 'Failed to delete assemble item', error });
    }
};
