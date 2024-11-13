const express = require('express');
const router = express.Router();
const assembleController = require('../controllers/assembleController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' }); // Define file upload destination

// Define routes for assemble operations
router.post('/', upload.array('images', 5), assembleController.createAssemble);
router.get('/', assembleController.getAssembles);
router.get('/:id', assembleController.getAssembleById);
router.put('/:id', upload.array('images', 5), assembleController.updateAssemble);
router.delete('/:id', assembleController.deleteAssemble);

module.exports = router;
