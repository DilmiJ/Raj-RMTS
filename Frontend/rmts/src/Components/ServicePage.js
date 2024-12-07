import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ServicePage.css'; // Link to the CSS file

const ServicePage = () => {
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    date: '',
    jobDonePerson: '',
  });
  const [services, setServices] = useState([]);
  const [searchInvoice, setSearchInvoice] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/services/create', formData);
      console.log('Form Data Submitted:', res.data);
      alert('Form Submitted Successfully!');
      fetchServices(); // Refresh the list of services
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch all services
  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/services');
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle search by invoice number
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/services/${searchInvoice}`);
      setServices([res.data]); // Set only the found service
    } catch (err) {
      alert('Service not found');
      fetchServices(); // Re-fetch all services if not found
    }
  };

  // Delete service
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/services/${id}`);
      alert('Service deleted successfully!');
      fetchServices(); // Refresh the service list
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="service-page-container">
      <form className="service-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="invoiceNumber">
            <span className="icon">📄</span> Invoice Number:
          </label>
          <input
            type="text"
            id="invoiceNumber"
            name="invoiceNumber"
            placeholder="Enter Invoice Number"
            value={formData.invoiceNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">
            <span className="icon">📅</span> Date:
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="jobDonePerson">
            <span className="icon">👤</span> Job Done By:
          </label>
          <input
            type="text"
            id="jobDonePerson"
            name="jobDonePerson"
            placeholder="Enter Name"
            value={formData.jobDonePerson}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by Invoice Number"
          value={searchInvoice}
          onChange={(e) => setSearchInvoice(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Services list */}
      <div className="services-list">
        {services.map(service => (
          <div key={service._id} className="service-item">
            <p>Invoice Number: {service.invoiceNumber}</p>
            <p>Date: {new Date(service.date).toLocaleDateString()}</p>
            <p>Job Done By: {service.jobDonePerson}</p>
            <button onClick={() => handleDelete(service._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
