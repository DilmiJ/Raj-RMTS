import React, { useState } from 'react';
import { FaQuoteLeft, FaQuestionCircle, FaPen, FaBoxOpen, FaHashtag } from 'react-icons/fa';

const RepairingForm = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [items, setItems] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Generate a unique invoice number
  const generateInvoiceNumber = () => {
    const uniqueNumber = 'RMTSB-' + Math.floor(Math.random() * 1000000);
    setInvoiceNumber(uniqueNumber);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/repairing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ invoiceNumber, problem, solution, items, quantity }),
      });
      const result = await response.json();
      if (response.ok) {
        alert('Repairing record saved successfully!');
      } else {
        alert('Error: ' + result.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to save repairing record. Please try again.');
    }
  };

  // Ensure only one space between items
  const handleItemChange = (e) => {
    const value = e.target.value;
    setItems(value.trim().replace(/\s+/g, ' ')); // Remove extra spaces between items
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#e0e0e0', padding: '20px', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#ff7f50' }}>Repairing Form</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <button type="button" onClick={generateInvoiceNumber} style={styles.button}>
          <FaQuoteLeft /> Generate Invoice Number
        </button>

        <div style={styles.formGroup}>
          <label>Invoice Number:</label>
          <input type="text" value={invoiceNumber} readOnly style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label>
            <FaQuestionCircle /> Problem:
          </label>
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>
            <FaPen /> Solution:
          </label>
          <input
            type="text"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>
            <FaBoxOpen /> Items:
          </label>
          <input
            type="text"
            value={items}
            onChange={handleItemChange}
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label>
            <FaHashtag /> Quantity:
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  form: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  },
  button: {
    backgroundColor: '#ff7f50',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontWeight: 'bold',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#333',
    color: '#e0e0e0',
  },
  submitButton: {
    backgroundColor: '#ff7f50',
    color: '#fff',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%',
  },
};

export default RepairingForm;
