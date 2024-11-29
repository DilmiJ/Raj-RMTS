const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    jobNumber: { type: String, required: true },
    duration: { type: String, required: true },
    date: { type: Date, required: true },
    hours: { type: Number, required: true },
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
