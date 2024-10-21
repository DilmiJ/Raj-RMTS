require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const customerRoutes = require('./routers/customerRoutes'); // Adjusted path

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/customer-details', customerRoutes); // Use customer routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
