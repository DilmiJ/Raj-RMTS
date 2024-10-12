import React from 'react';
import { useLocation } from 'react-router-dom'; // To receive passed state
import '../css/Estimate.css';
import { FaCheck, FaTimes } from 'react-icons/fa'; // Icons for buttons

const Estimate = () => {
  const location = useLocation();
  const { formData, invoiceNumber } = location.state || {};

  return (
    <div className="estimate-container">
      <h2>Quotation Summary</h2>

      {/* Display Invoice Number */}
      <div className="quotation-section">
        <p><strong>Invoice Number:</strong> {invoiceNumber}</p>

        {/* Display Form Data */}
        <p><strong>Customer Name:</strong> {formData.customerName}</p>
        <p><strong>Customer Address:</strong> {formData.address}</p>
        <p><strong>Customer Mobile:</strong> {formData.mobileNumber}</p>
        <p><strong>Customer Email:</strong> {formData.email}</p>
        <p><strong>Customer Company Name:</strong> {formData.companyName}</p>
        <p><strong>Customer Company Address:</strong> {formData.companyAddress}</p>
        <p><strong>Customer Company Hotline:</strong> {formData.companyHotline}</p>
      </div>

      {/* Accept and Reject Buttons */}
      <div className="action-buttons">
        <button className="accept-button">
          <FaCheck className="icon" /> Accept
        </button>
        <button className="reject-button">
          <FaTimes className="icon" /> Reject
        </button>
      </div>
    </div>
  );
};

export default Estimate;
