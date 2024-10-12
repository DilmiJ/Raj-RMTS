import React, { useState, useEffect } from 'react';
import '../css/CustomerDetails.css';
import { FaKeyboard } from 'react-icons/fa';
import axios from 'axios';

const CustomerDetails = ({ invoiceNumber }) => {
    const [formData, setFormData] = useState({
        customerName: '',
        address: '',
        mobileNumber: '',
        whatsappNumber: '',
        job: '',
        email: '',
        companyName: '',
        companyAddress: '',
        companyHotline: '',
        companyWhatsapp: ''
    });

    const [errors, setErrors] = useState({});
    const [customers, setCustomers] = useState([]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        const nameRegex = /^[a-zA-Z\s]*$/;

        if (!formData.customerName) {
            newErrors.customerName = 'Customer name is required';
        } else if (!nameRegex.test(formData.customerName)) {
            newErrors.customerName = 'Customer name cannot contain numbers or symbols';
        }

        if (!formData.mobileNumber) {
            newErrors.mobileNumber = 'Customer mobile is required';
        }

        if (!formData.companyName) {
            newErrors.companyName = 'Customer company name is required';
        }

        if (!formData.companyHotline) {
            newErrors.companyHotline = 'Customer company hotline is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post('http://localhost:3000/customers', { ...formData, invoiceNumber });
                console.log(response.data);
                // Reset the form after successful submission
                setFormData({
                    customerName: '',
                    address: '',
                    mobileNumber: '',
                    whatsappNumber: '',
                    job: '',
                    email: '',
                    companyName: '',
                    companyAddress: '',
                    companyHotline: '',
                    companyWhatsapp: ''
                });
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        }
    };

    // Fetch customers on component mount
    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:3000/customers');
                setCustomers(response.data);
            } catch (error) {
                console.error('Error fetching customers:', error);
            }
        };

        fetchCustomers();
    }, []);

    return (
        <div className="customer-details-container">
            <h2>Customer Details</h2>

            {/* Display Invoice Number */}
            <div className="form-group">
                <label>Invoice Number</label>
                <input
                    type="text"
                    value={invoiceNumber}
                    readOnly
                    className="readonly-input"
                />
            </div>

            <form onSubmit={handleSubmit} className="customer-form">
                {/* Customer Name */}
                <div className="form-group">
                    <label>Customer Name*</label>
                    <input
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleInputChange}
                        className={errors.customerName ? 'error-input' : ''}
                    />
                    {errors.customerName && <span className="error">{errors.customerName}</span>}
                </div>

                {/* Other form fields */}
                <div className="form-group">
                    <label>Customer Address*</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Customer Mobile*</label>
                    <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className={errors.mobileNumber ? 'error-input' : ''}
                    />
                    {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
                </div>

                <div className="form-group">
                    <label>Customer WhatsApp</label>
                    <input
                        type="text"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Customer Job</label>
                    <input
                        type="text"
                        name="job"
                        value={formData.job}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Customer Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <h3>Customer Company Details</h3>

                <div className="form-group">
                    <label>Customer Company Name*</label>
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        className={errors.companyName ? 'error-input' : ''}
                    />
                    {errors.companyName && <span className="error">{errors.companyName}</span>}
                </div>

                <div className="form-group">
                    <label>Customer Company Address*</label>
                    <input
                        type="text"
                        name="companyAddress"
                        value={formData.companyAddress}
                        onChange={handleInputChange}
                    />
                </div>

                <div className="form-group">
                    <label>Customer Company Hotline*</label>
                    <input
                        type="text"
                        name="companyHotline"
                        value={formData.companyHotline}
                        onChange={handleInputChange}
                        className={errors.companyHotline ? 'error-input' : ''}
                    />
                    {errors.companyHotline && <span className="error">{errors.companyHotline}</span>}
                </div>

                <div className="form-group">
                    <label>Customer Company WhatsApp</label>
                    <input
                        type="text"
                        name="companyWhatsapp"
                        value={formData.companyWhatsapp}
                        onChange={handleInputChange}
                    />
                </div>

                <button type="submit" className="submit-button">
                    <FaKeyboard className="submit-icon" /> Submit
                </button>
            </form>

            {/* Display customers */}
            <div>
                <h3>Customer List</h3>
                <ul>
                    {customers.map(customer => (
                        <li key={customer.id}>{customer.customerName}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CustomerDetails;
