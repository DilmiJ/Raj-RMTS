const express = require('express');

const multer = require('multer');
const { createAssemble, getAssembles, updateAssemble, deleteAssemble, getImage } = require('../controllers/assembleContoller');
//k

const router = express.Router();


// Define routes
router.post('/create', createAssemble);
router.get('/', getAssembles);
//router.get('/:id', getAssembleById);
router.put('/:id', updateAssemble);
router.delete('/:id', deleteAssemble);
//router.post('/quotation', createQuotation);

module.exports = router;
