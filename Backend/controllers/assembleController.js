
const Assemble = require('../models/AssembleModels '); // Correct path to the model

// Your controller methods here


// Handle creating a new assemble item
exports.createAssemble = async (req, res) => {
    try {
        const { itemName, itemNumber, stockAvailable, price, specification } = req.body;
        const images = req.files ? req.files.map(file => file.path) : []; // Store file paths of uploaded images

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

// Handle updating an assemble item by ID
exports.updateAssemble = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemName, itemNumber, stockAvailable, price, specification } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        const updatedData = {
            itemName,
            itemNumber,
            stockAvailable,
            price,
            specification,
            images
        };

        const updatedAssemble = await Assemble.findByIdAndUpdate(id, updatedData, { new: true }); // Update the item by ID
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
        await Assemble.findByIdAndDelete(id); // Delete the item by ID
        res.status(200).send({ message: `Assemble item with ID ${id} deleted successfully` });
    } catch (error) {
        console.error('Error deleting assemble item:', error);
        res.status(500).send({ message: 'Failed to delete assemble item', error });
    }
};







