import React, { useState } from 'react';
import '../css/CustomerDetails.css';

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

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Customer name is required';
    } else if (formData.customerName.length < 3) {
      newErrors.customerName = 'Customer name should be at least 3 characters';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    const phonePattern = /^[0-9]{10}$/;
    if (!formData.mobileNumber && !formData.alternateNumber) {
      newErrors.mobileNumber = 'At least one phone number is required';
    } else if (formData.mobileNumber && !phonePattern.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Mobile number should be a valid 10-digit number';
    }

    if (formData.alternateNumber && !phonePattern.test(formData.alternateNumber)) {
      newErrors.alternateNumber = 'Alternate number should be a valid 10-digit number';
    }

    if (formData.whatsappNumber && !phonePattern.test(formData.whatsappNumber)) {
      newErrors.whatsappNumber = 'WhatsApp number should be a valid 10-digit number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Form submitted:', formData);
      // You can add the logic to handle form submission here
    }
  };

  return (
    <div className="customer-details-container">
      <h2>Customer Details</h2>
      <form onSubmit={handleSubmit} className="customer-form">
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
            className={errors.address ? 'error-input' : ''}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

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
            className={errors.alternateNumber ? 'error-input' : ''}
          />
          {errors.alternateNumber && <span className="error">{errors.alternateNumber}</span>}
        </div>

        <div className="form-group">
          <label>WhatsApp Number</label>
          <input
            type="text"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleInputChange}
            className={errors.whatsappNumber ? 'error-input' : ''}
          />
          {errors.whatsappNumber && <span className="error">{errors.whatsappNumber}</span>}
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CustomerDetails;
