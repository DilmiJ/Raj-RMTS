const express = require('express');
const multer = require('multer');
const { createAssemble, getAssembles, updateAssemble, deleteAssemble, getImage } = require('../controllers/assembleController');
//k
const router = express.Router();

// Set up multer storage for images
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the routes
router.post('/', upload.array('images'), createAssemble);  // Add new assemble item (with images)
router.get('/', getAssembles);  // Get all assemble items
router.get('/image/:id', getImage);  // Get image for a specific assemble item
router.put('/:id', upload.array('images'), updateAssemble);  // Update an assemble item
router.delete('/:id', deleteAssemble);  // Delete an assemble item

module.exports = router;
