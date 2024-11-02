const Assemble = require('../models/assembleModel'); // Import the Assemble model

// Get all items
exports.getAssembles = async (req, res) => {
    try {
        const assembles = await Assemble.find();
        res.status(200).json(assembles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Get a single item by ID
exports.getAssembleById = async (req, res) => {
    const { id } = req.params;
    try {
        const assemble = await Assemble.findById(id);
        if (!assemble) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(assemble);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve item' });
    }
};

// Add a new item
exports.createAssemble = async (req, res) => {
    const assembleData = req.body;
    try {
        const newAssemble = new Assemble(assembleData);
        await newAssemble.save();
        res.status(201).json(newAssemble);
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({ message: 'Item number must be unique' });
        }
        console.error('Failed to save item data:', error);
        res.status(500).json({ message: 'Failed to save item data', error: error.message });
    }
};

// Update an item by ID
exports.updateAssemble = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedAssemble = await Assemble.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
        if (!updatedAssemble) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedAssemble);
    } catch (error) {
        console.error('Failed to update item data:', error);
        res.status(500).json({ message: 'Failed to update item data' });
    }
};

// Delete an item by ID
exports.deleteAssemble = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedAssemble = await Assemble.findByIdAndDelete(id);
        if (!deletedAssemble) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted' });
    } catch (error) {
        console.error('Failed to delete item:', error);
        res.status(500).json({ message: 'Failed to delete item' });
    }
};
