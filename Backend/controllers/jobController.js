const Job = require('../models/jobModel');

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
};

// Add a new job
// controllers/jobController.js
exports.createJob = async (req, res) => {
    try {
        const { userId, jobNumber, duration, date, hours } = req.body;

        // Check if required fields are provided
        if (!userId || !jobNumber || !duration || !date || !hours) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newJob = new Job({ userId, jobNumber, duration, date, hours });
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        console.error("Error creating job:", error);  // Log the error for debugging
        res.status(500).json({ message: 'Error adding job', error });
    }
};


// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting job', error });
    }
};
