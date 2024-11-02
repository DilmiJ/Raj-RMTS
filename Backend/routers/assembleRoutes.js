const express = require('express');
const multer = require('multer');
const Assemble = require('../models/assembleModel'); // Ensure this path is correct

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory to save uploaded files

// Route to add a new item (handles image uploads)
router.post('/', upload.array('images', 10), async (req, res) => {
    const { itemName, itemNumber, stockAvailable, price, specification } = req.body;

    try {
        const images = req.files.map(file => file.path); // Map uploaded file paths
        const newItem = new Assemble({
            itemName,
            itemNumber,
            stockAvailable,
            price,
            specification,
            images,
        });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000) {
            return res.status(400).json({ message: 'Item number must be unique' });
        }
        console.error('Failed to save item:', error);
        res.status(500).json({ message: 'Failed to save item', error: error.message });
    }
});

// Get all items
router.get('/', async (req, res) => {
    try {
        const assembles = await Assemble.find();
        res.status(200).json(assembles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Other routes can be added here...

module.exports = router;
