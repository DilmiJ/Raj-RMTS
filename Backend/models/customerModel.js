const mongoose = require('mongoose');// form structure 

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    mobileNumber: {
        type: String,
        required: true
    },
    whatsappNumber: {
        type: String,
    },
    job: {
        type: String,
    },
    email: {
        type: String,
    },
    companyName: {
        type: String,
        required: true
    },
    companyAddress: {
        type: String,
    },
    companyHotline: {
        type: String,
        required: true
    },
    companyWhatsapp: {
        type: String,
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
