import React, { useState } from 'react';
import '../css/CustomerDetails.css';
import { FaKeyboard } from 'react-icons/fa';

const CustomerDetails = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    mobileNumber: '',
    alternateNumber: '',
    whatsappNumber: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces
    if (!formData.customerName) {
      newErrors.customerName = 'Customer name is required';
    } else if (!nameRegex.test(formData.customerName)) {
      newErrors.customerName = 'Customer name cannot contain numbers or symbols';
    }

    if (!formData.mobileNumber && !formData.alternateNumber) {
      newErrors.mobileNumber = 'At least one phone number is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      // Add form submission logic here
    }
  };

  return (
    <div className="customer-details-container">
      <h2>Customer Details</h2>
      <form onSubmit={handleSubmit} className="customer-form">
        <div className="form-row">
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className={errors.customerName ? 'error-input' : ''}
            />
            {errors.customerName && <span className="error">{errors.customerName}</span>}
          </div>

          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Mobile Number</label>
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
            <label>Alternate Number</label>
            <input
              type="text"
              name="alternateNumber"
              value={formData.alternateNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>WhatsApp Number</label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <button type="submit" className="submit-button">
          <FaKeyboard className="submit-icon" /> Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerDetails;
