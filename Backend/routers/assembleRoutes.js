// routes/assembleRoutes.js
const express = require('express');
const multer = require('multer'); // Used to handle file uploads
const {
    createAssemble,
    getAssembles,
    updateAssemble,
    deleteAssemble
} = require('../controllers/assembleController'); // Import the controller functions

const router = express.Router();

// Set up multer storage for images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store uploaded files in the "uploads" folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage });

// Define the routes
router.post('/', upload.array('images'), createAssemble);  // Add new assemble item (with images)
router.get('/', getAssembles);  // Get all assemble items
router.put('/:id', upload.array('images'), updateAssemble);  // Update an assemble item
router.delete('/:id', deleteAssemble);  // Delete an assemble item

module.exports = router;
