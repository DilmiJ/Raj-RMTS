const express = require('express');
<<<<<<< HEAD
=======
const multer = require('multer');
const { createAssemble, getAssembles, updateAssemble, deleteAssemble, getImage } = require('../controllers/assembleController');
//k
>>>>>>> 25c64cc0d123cc25a7f3680eec5bbaec931feafa
const router = express.Router();
const {
    createAssemble,
    getAssembles,
    getAssembleById,
    updateAssemble,
    deleteAssemble,
    createQuotation
} = require('../controllers/assembleController');

// Define routes
router.post('/create', createAssemble);
router.get('/', getAssembles);
router.get('/:id', getAssembleById);
router.put('/:id', updateAssemble);
router.delete('/:id', deleteAssemble);
router.post('/quotation', createQuotation);

module.exports = router;
