const Assemble = require('../models/assembleModels');

// Create a new assemble item (with image buffer)
const createAssemble = async (req, res) => {
    try {
        const { itemName, itemNumber, stockAvailable, price, specification } = req.body;
        const images = req.files.map((file) => ({
            data: file.buffer,  // Store image as buffer
            contentType: file.mimetype,
        }));

        console.log('Request Body:', req.body);
        console.log('Request Files:', req.files);

        const newAssemble = new Assemble({
            itemName,
            itemNumber,
            stockAvailable,
            price,
            specification,
            images,
        });

        await newAssemble.save();
        res.status(201).json(newAssemble);
    } catch (error) {
        console.error("Error details:", error);
        res.status(500).json({ message: 'Error creating assemble item', error: error.message });
    }
};

// Get all assemble items
const getAssembles = async (req, res) => {
    try {
        const assembles = await Assemble.find();
        res.status(200).json(assembles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching assemble items', error: error.message });
    }
};

// Get image for a specific assemble item
const getImage = async (req, res) => {
    try {
        const assemble = await Assemble.findById(req.params.id);
        if (!assemble || !assemble.images.length) {
            return res.status(404).json({ message: 'Image not found' });
        }
        const image = assemble.images[0]; // Assuming only one image
        res.contentType(image.contentType);
        res.send(image.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching image', error: error.message });
    }
};

// Update an existing assemble item
const updateAssemble = async (req, res) => {
    try {
        const { itemName, itemNumber, stockAvailable, price, specification } = req.body;
        const images = req.files.map((file) => ({
            data: file.buffer,
            contentType: file.mimetype,
        }));

        const updatedAssemble = await Assemble.findByIdAndUpdate(
            req.params.id,
            { itemName, itemNumber, stockAvailable, price, specification, images },
            { new: true }
        );

        if (!updatedAssemble) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedAssemble);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating assemble item', error: error.message });
    }
};

// Delete an assemble item
const deleteAssemble = async (req, res) => {
    try {
        const deletedAssemble = await Assemble.findByIdAndDelete(req.params.id);

        if (!deletedAssemble) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting assemble item', error: error.message });
    }
};

module.exports = { createAssemble, getAssembles, updateAssemble, deleteAssemble, getImage };
