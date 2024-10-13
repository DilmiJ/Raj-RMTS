// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { poolPromise, sql } = require('./db');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Create (Add Customer)
app.post('/customers', async (req, res) => {
    const { customerName, address, mobileNumber, whatsappNumber, job, email, companyName, companyAddress, companyHotline, companyWhatsapp, invoiceNumber } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('customerName', sql.VarChar, customerName)
            .input('address', sql.VarChar, address)
            .input('mobileNumber', sql.VarChar, mobileNumber)
            .input('whatsappNumber', sql.VarChar, whatsappNumber)
            .input('job', sql.VarChar, job)
            .input('email', sql.VarChar, email)
            .input('companyName', sql.VarChar, companyName)
            .input('companyAddress', sql.VarChar, companyAddress)
            .input('companyHotline', sql.VarChar, companyHotline)
            .input('companyWhatsapp', sql.VarChar, companyWhatsapp)
            .query('INSERT INTO Customers (customerName, address, mobileNumber, whatsappNumber, job, email, companyName, companyAddress, companyHotline, companyWhatsapp, invoiceNumber) VALUES (@customerName, @address, @mobileNumber, @whatsappNumber, @job, @email, @companyName, @companyAddress, @companyHotline, @companyWhatsapp, @invoiceNumber)');

        res.status(201).send({ message: 'Customer added successfully', result });
    } catch (err) {
        console.error('Error adding customer: ', err);
        res.status(500).send({ message: 'Error adding customer', error: err });
    }
});

// Read (Get All Customers)
app.get('/customers', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Customers');
        res.status(200).send(result.recordset);
    } catch (err) {
        console.error('Error fetching customers: ', err);
        res.status(500).send({ message: 'Error fetching customers', error: err });
    }
});

// Update (Update Customer)
app.put('/customers/:id', async (req, res) => {
    const { id } = req.params;
    const { customerName, address, mobileNumber, whatsappNumber, job, email, companyName, companyAddress, companyHotline, companyWhatsapp } = req.body;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('customerName', sql.VarChar, customerName)
            .input('address', sql.VarChar, address)
            .input('mobileNumber', sql.VarChar, mobileNumber)
            .input('whatsappNumber', sql.VarChar, whatsappNumber)
            .input('job', sql.VarChar, job)
            .input('email', sql.VarChar, email)
            .input('companyName', sql.VarChar, companyName)
            .input('companyAddress', sql.VarChar, companyAddress)
            .input('companyHotline', sql.VarChar, companyHotline)
            .input('companyWhatsapp', sql.VarChar, companyWhatsapp)
            .query('UPDATE Customers SET customerName=@customerName, address=@address, mobileNumber=@mobileNumber, whatsappNumber=@whatsappNumber, job=@job, email=@email, companyName=@companyName, companyAddress=@companyAddress, companyHotline=@companyHotline, companyWhatsapp=@companyWhatsapp WHERE id=@id');

        res.status(200).send({ message: 'Customer updated successfully', result });
    } catch (err) {
        console.error('Error updating customer: ', err);
        res.status(500).send({ message: 'Error updating customer', error: err });
    }
});

// Delete (Delete Customer)
app.delete('/customers/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM Customers WHERE id=@id');

        res.status(200).send({ message: 'Customer deleted successfully', result });
    } catch (err) {
        console.error('Error deleting customer: ', err);
        res.status(500).send({ message: 'Error deleting customer', error: err });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
