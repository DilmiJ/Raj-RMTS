require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const assembleRoutes = require('./routers/assembleRoutes'); // Adjust path if necessary
const customerRoutes = require('./routers/customerRoutes'); // Adjust path if necessary

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Enable CORS for all requests
app.use(express.json()); // Parses incoming JSON requests

// Routes
app.use('/api/assemble', assembleRoutes); // Use assemble routes
app.use('/api/customer-details', customerRoutes); // Use customer routes

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
