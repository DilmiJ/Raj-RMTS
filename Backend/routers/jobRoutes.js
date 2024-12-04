const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// Get all jobs
router.get('/', jobController.getAllJobs);

// Add a new job
router.post('/', jobController.createJob);

// Delete a job
router.delete('/:id', jobController.deleteJob);

module.exports = router;
