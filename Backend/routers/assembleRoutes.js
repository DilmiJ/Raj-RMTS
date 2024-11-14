const express = require('express');
<<<<<<< HEAD
=======
const multer = require('multer');
const { createAssemble, getAssembles, updateAssemble, deleteAssemble, getImage } = require('../controllers/assembleController');

>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a
const router = express.Router();
const assembleController = require('../controllers/assembleController');
const multer = require('multer');

<<<<<<< HEAD
const upload = multer({ dest: 'uploads/' }); // Define file upload destination

// Define routes for assemble operations
router.post('/', upload.array('images', 5), assembleController.createAssemble);
router.get('/', assembleController.getAssembles);
router.get('/:id', assembleController.getAssembleById);
router.put('/:id', upload.array('images', 5), assembleController.updateAssemble);
router.delete('/:id', assembleController.deleteAssemble);
=======
// Set up multer storage for images
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Define the routes
router.post('/', upload.array('images'), createAssemble);  // Add new assemble item (with images)
router.get('/', getAssembles);  // Get all assemble items
router.get('/image/:id', getImage);  // Get image for a specific assemble item
router.put('/:id', upload.array('images'), updateAssemble);  // Update an assemble item
router.delete('/:id', deleteAssemble);  // Delete an assemble item
>>>>>>> b1615bd81032cdb9471e0d369e3ce6eff58c982a

module.exports = router;
