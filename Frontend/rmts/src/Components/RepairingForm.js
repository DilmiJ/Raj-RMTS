import React, { useState } from 'react';
import { FaQuoteLeft, FaQuestionCircle, FaPen, FaBoxOpen, FaHashtag } from 'react-icons/fa';

const RepairingForm = () => {
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [items, setItems] = useState('');
  const [quantity, setQuantity] = useState(1);



  










  // This function generates a unique invoice number
  const generateInvoiceNumber = () => {
    const uniqueNumber = 'RMTSB-' + Math.floor(Math.random() * 1000000);
    setInvoiceNumber(uniqueNumber);
  };

  // Example submit function
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
    }
  };
  

  // Ensure only one space between items
  const handleItemChange = (e) => {
    const value = e.target.value;
    setItems(value.trim().replace(/\s+/g, ' ')); // Remove extra spaces between items
  };

  return (
    <div className="repairing-form-container">
      <h1>Repairing Form</h1>
      <form onSubmit={handleSubmit} className="repairing-form">
        <button type="button" onClick={generateInvoiceNumber} className="generate-btn">
          <FaQuoteLeft /> Generate Invoice Number
        </button>

        <div className="form-group">
          <label>Invoice Number:</label>
          <input type="text" value={invoiceNumber} readOnly />
        </div>

        <div className="form-group">
          <label><FaQuestionCircle /> Problem:</label>
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><FaPen /> Solution:</label>
          <input
            type="text"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label><FaBoxOpen /> Items:</label>
          <input
            type="text"
            value={items}
            onChange={handleItemChange}
          />
        </div>

        <div className="form-group">
          <label><FaHashtag /> Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>

      {/* Inline CSS for dark theme */}
      <style jsx>{`
        /* General styling for the form */
        body {
          font-family: 'Arial', sans-serif;
          background-color: #121212; /* Dark background */
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          color: #e0e0e0; /* Light text for readability */
        }

        /* Title Styling */
        h1 {
          text-align: center;
          color: #ff7f50; /* Soft coral color */
          font-size: 2.8rem;
          font-weight: bold;
          margin-bottom: 30px;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1); /* Subtle text shadow */
        }

        /* Form Container */
        .repairing-form-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .repairing-form {
          background: #1e1e1e; /* Dark background for the form */
          border-radius: 15px;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.5);
          padding: 40px;
          width: 100%;
          max-width: 650px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          transition: all 0.3s ease;
        }

        /* Hover effect for the form */
        .repairing-form:hover {
          transform: scale(1.03);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.7);
        }

        /* Button styling */
        button[type="button"], button[type="submit"] {
          background-color: #ff7f50; /* Soft coral background */
          color: #fff;
          border: none;
          padding: 14px 22px;
          font-size: 1.1rem;
          border-radius: 30px; /* Rounded corners */
          cursor: pointer;
          text-transform: uppercase;
          font-weight: bold;
          letter-spacing: 1px;
          transition: background-color 0.3s ease, transform 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        /* Button hover effect */
        button[type="button"]:hover, button[type="submit"]:hover {
          background-color: #ff6347; /* Lighter red-orange on hover */
          transform: scale(1.05);
        }

        /* Input fields styling */
        input[type="text"], input[type="number"] {
          padding: 14px;
          border: 2px solid #ff7f50; /* Orange border */
          border-radius: 15px; /* Rounded input fields */
          font-size: 1rem;
          background-color: #333; /* Dark background */
          color: #e0e0e0;
          transition: all 0.3s ease;
        }

        /* Input fields on focus */
        input[type="text"]:focus, input[type="number"]:focus {
          border-color: #ff6347; /* Darker orange border on focus */
          outline: none;
          background-color: #444; /* Darker background when focused */
        }

        /* Label styling with icon spacing */
        label {
          font-size: 1.2rem;
          color: #ccc; /* Light gray for label text */
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: bold;
        }

        /* Adjusting icon sizes */
        label svg {
          font-size: 1.5rem;
          color: #ff7f50; /* Matching the soft coral color for icons */
        }

        /* Spacing between form elements */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        /* Styling for the invoice number generation button */
        button[type="button"] {
          width: 100%;
          padding: 16px;
          font-size: 1.2rem;
        }

        /* Hover effect for input fields */
        input[type="text"]:hover, input[type="number"]:hover {
          background-color: #555;
          border-color: #ff7f50; /* Slight border color change on hover */
        }

        /* Additional styling for spacing, including buttons and form */
        button[type="submit"] {
          margin-top: 30px;
          padding: 15px;
          width: 100%;
          text-align: center;
        }

        /* Responsive design for mobile devices */
        @media (max-width: 768px) {
          .repairing-form {
            padding: 20px;
          }

          button[type="button"], button[type="submit"] {
            font-size: 1rem;
            padding: 12px;
          }

          label svg {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default RepairingForm;
