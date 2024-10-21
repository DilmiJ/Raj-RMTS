import React, { useState, useEffect } from 'react';
import '../css/CustomerDetails.css';
import { FaKeyboard } from 'react-icons/fa';

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
  const [editingCustomerId, setEditingCustomerId] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/customer-details');
      const data = await response.json();
      setCustomers(data);
    } catch (err) {
      console.error('Error fetching customers:', err);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

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
        const response = await fetch(
          `http://localhost:5000/api/customer-details${editingCustomerId ? `/${editingCustomerId}` : ''}`,
          {
            method: editingCustomerId ? 'PUT' : 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...formData, invoiceNumber }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to save customer data.');
        }

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

        fetchCustomers();

        if (editingCustomerId) {
          setEditingCustomerId(null);
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const deleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/customer-details/${customerId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCustomers();
      } else {
        alert('Failed to delete customer.');
      }
    } catch (err) {
      console.error('Error deleting customer:', err);
    }
  };

  const updateCustomerData = (customer) => {
    setFormData({
      customerName: customer.customerName,
      address: customer.address,
      mobileNumber: customer.mobileNumber,
      whatsappNumber: customer.whatsappNumber,
      job: customer.job,
      email: customer.email,
      companyName: customer.companyName,
      companyAddress: customer.companyAddress,
      companyHotline: customer.companyHotline,
      companyWhatsapp: customer.companyWhatsapp,
    });
    setEditingCustomerId(customer._id);
  };

  const viewCustomer = (customer) => {
    alert(`Viewing customer: ${customer.customerName}`);
    // Additional functionality to display the customer details can be added here.
  };

  return (
    <div className="customer-details-container">
      <div className="left-side">
        <h2>Customer Details</h2>

        <div className="form-group">
          <label>📄 Invoice Number</label>
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
            <label>👤 Customer Name*</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              className={errors.customerName ? 'error-input' : ''}
            />
            {errors.customerName && <span className="error">{errors.customerName}</span>}
          </div>

          {/* Address */}
          <div className="form-group">
            <label>🏠 Customer Address*</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </div>

          {/* Mobile Number */}
          <div className="form-group">
            <label>📞 Customer Mobile*</label>
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className={errors.mobileNumber ? 'error-input' : ''}
            />
            {errors.mobileNumber && <span className="error">{errors.mobileNumber}</span>}
          </div>

          {/* WhatsApp */}
          <div className="form-group">
            <label>💬 Customer WhatsApp</label>
            <input
              type="text"
              name="whatsappNumber"
              value={formData.whatsappNumber}
              onChange={handleInputChange}
            />
          </div>

          {/* Job */}
          <div className="form-group">
            <label>💼 Customer Job</label>
            <input
              type="text"
              name="job"
              value={formData.job}
              onChange={handleInputChange}
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label>📧 Customer Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>

          <h3>Customer Company Details</h3>

          {/* Company Name */}
          <div className="form-group">
            <label>🏢 Company Name*</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleInputChange}
              className={errors.companyName ? 'error-input' : ''}
            />
            {errors.companyName && <span className="error">{errors.companyName}</span>}
          </div>

          {/* Company Address */}
          <div className="form-group">
            <label>🏠 Company Address*</label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleInputChange}
            />
          </div>

          {/* Company Hotline */}
          <div className="form-group">
            <label>☎️ Company Hotline*</label>
            <input
              type="text"
              name="companyHotline"
              value={formData.companyHotline}
              onChange={handleInputChange}
              className={errors.companyHotline ? 'error-input' : ''}
            />
            {errors.companyHotline && <span className="error">{errors.companyHotline}</span>}
          </div>

          {/* Company WhatsApp */}
          <div className="form-group">
            <label>💬 Company WhatsApp</label>
            <input
              type="text"
              name="companyWhatsapp"
              value={formData.companyWhatsapp}
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-button">
            <FaKeyboard className="submit-icon" /> {editingCustomerId ? 'Update' : 'Submit'}
          </button>
        </form>
      </div>

      {/* Customer List on the right side */}
      <div className="right-side">
        <h2>Customers</h2>
        <ul className="customer-list">
          {customers.map((customer) => (
            <li key={customer._id} className="customer-item">
              <span>{customer.customerName}</span>
              <div className="customer-actions">
                <button onClick={() => updateCustomerData(customer)} className="update-button">Update</button>
                <button onClick={() => viewCustomer(customer)} className="view-button">View</button>
                <button onClick={() => deleteCustomer(customer._id)} className="delete-button">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CustomerDetails;
