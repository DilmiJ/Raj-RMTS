const Item = require('../models/itemModel');

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
};

// Add a new item
exports.createItem = async (req, res) => {
    try {
        const { name, price } = req.body;
        const newItem = new Item({ name, price });
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error });
    }
};

// Update an item
exports.updateItem = async (req, res) => {
    try {
        const { name, price } = req.body;
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, { name, price }, { new: true });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Error updating item', error });
    }
};

// Delete an item
exports.deleteItem = async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting item', error });
    }
};
