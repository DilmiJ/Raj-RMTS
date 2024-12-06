const mongoose = require('mongoose');

<<<<<<< HEAD
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

const Item = mongoose.model('Item', itemSchema);
=======
const ItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});

const Item = mongoose.model('Item', ItemSchema);
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa

module.exports = Item;
