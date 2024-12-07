const Item = require('../models/itemModel');

// Get all items
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching items', error });
  }
};

// Get a single item by ID
exports.getItemById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve item', error });
  }
};

// Add a new item
exports.createItem = async (req, res) => {
  const itemData = req.body;
  try {
    const newItem = new Item(itemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save item data', error });
  }
};

// Update an item by ID
exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item data', error });
  }
};

// Delete an item by ID
exports.deleteItem = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedItem = await Item.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error });
  }
};
