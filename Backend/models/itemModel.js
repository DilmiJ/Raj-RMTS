const mongoose = require('mongoose');

// Define the schema for Item
const itemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  itemNumber: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  }
});

// Create a model based on the schema
const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
