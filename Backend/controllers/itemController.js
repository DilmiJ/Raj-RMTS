const Item = require('../models/itemModel');

// Get all items
<<<<<<< HEAD
exports.getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
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
    res.status(500).json({ message: 'Failed to retrieve item' });
  }
=======
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error });
    }
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
};

// Add a new item
exports.createItem = async (req, res) => {
<<<<<<< HEAD
  const itemData = req.body;
  try {
    const newItem = new Item(itemData);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save item data' });
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
    res.status(500).json({ message: 'Failed to update item data' });
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
    res.status(200).json({ message: 'Item deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item' });
  }
=======
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
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
};
