const express = require('express');
const multer = require('multer');
const { 
  getCustomers, 
  createCustomer, 
  updateCustomer, 
  deleteCustomer, 
  getCustomerById 
} = require('../controllers/customerController'); // Adjust the path if necessary
const Assemble = require('../models/assembleModel'); // Adjust path as necessary

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Directory to save uploaded files

// Route to add a new item (now handles image uploads)
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
    res.status(500).json({ message: 'Failed to save item', error });
  }
});

// Other routes...

module.exports = router;
