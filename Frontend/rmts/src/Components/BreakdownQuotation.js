import React, { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import "../css/BreakdownQutation.css";

const BreakdownQuotation = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", quantity: "" });
  const [oldItems, setOldItems] = useState([]);
  const [newOldItem, setNewOldItem] = useState({ name: "", quantity: "" });
  const [repairDate, setRepairDate] = useState("");
  const [systemDetails, setSystemDetails] = useState("");
  const [jobDoneBy, setJobDoneBy] = useState({ name: "", number: "" });
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [quotationNumber, setQuotationNumber] = useState("");
  const [qrData, setQrData] = useState(""); // Empty QR code data initially

  // Function to generate the QR code data
  const generateQRCodeData = () => {
    const itemsData = items.map(item => `${item.name} (Qty: ${item.quantity})`).join(", ");
    const oldItemsData = oldItems.map(item => `${item.name} (Qty: ${item.quantity})`).join(", ");
  
    return `Invoice Number: ${invoiceNumber}
            Repair Date: ${repairDate}
            System Details: ${systemDetails}
            Job Done By: ${jobDoneBy.name} - ${jobDoneBy.number}
            New Items: ${itemsData}
            Old Items: ${oldItemsData}
            What Happened to the System: ${systemDetails}`;
  };

  useEffect(() => {
    // Set QR code data dynamically whenever relevant data changes
    setQrData(generateQRCodeData());
  }, [invoiceNumber, repairDate, systemDetails, jobDoneBy, items, oldItems]); // Trigger when any change occurs

  const handleAddItem = () => {
    if (newItem.name && newItem.quantity) {
      setItems([...items, newItem]);
      setNewItem({ name: "", quantity: "" });
    }
  };

  const handleAddOldItem = () => {
    if (newOldItem.name && newOldItem.quantity) {
      setOldItems([...oldItems, newOldItem]);
      setNewOldItem({ name: "", quantity: "" });
    }
  };

  const handleSubmit = async () => {
    const quotationData = {
      quotationNumber,
      invoiceNumber,
      repairDate,
      systemDetails,
      jobDoneBy,
      newItems: items,
      oldItems: oldItems,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/breakdown/save-quotation", quotationData);
      alert("Quotation saved successfully");
      setQrData(generateQRCodeData()); // Update the QR code after saving
    } catch (error) {
      alert("Error saving quotation: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="left-section">
        <h1>Breakdown Quotation</h1>
        <div>
          <label>Quotation Number:</label>
          <input
            type="text"
            value={quotationNumber}
            onChange={(e) => setQuotationNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Invoice Number:</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
          />
        </div>
        <div>
          <h2>Add New Items</h2>
          <label>Item Name:</label>
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          />
          <label>Quantity:</label>
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) =>
              setNewItem({ ...newItem, quantity: e.target.value })
            }
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
        <div>
          <h2>Add Old Quotation Items</h2>
          <label>Item Name:</label>
          <input
            type="text"
            value={newOldItem.name}
            onChange={(e) =>
              setNewOldItem({ ...newOldItem, name: e.target.value })
            }
          />
          <label>Quantity:</label>
          <input
            type="number"
            value={newOldItem.quantity}
            onChange={(e) =>
              setNewOldItem({ ...newOldItem, quantity: e.target.value })
            }
          />
          <button onClick={handleAddOldItem}>Add Old Item</button>
        </div>
        <div>
          <label>Repair Date:</label>
          <input
            type="date"
            value={repairDate}
            onChange={(e) => setRepairDate(e.target.value)}
          />
        </div>
        <div>
          <label>What Happened to the System:</label>
          <textarea
            value={systemDetails}
            onChange={(e) => setSystemDetails(e.target.value)}
            rows="3"
          />
        </div>
        <div>
          <h2>Job Done By</h2>
          <label>Name:</label>
          <input
            type="text"
            value={jobDoneBy.name}
            onChange={(e) =>
              setJobDoneBy({ ...jobDoneBy, name: e.target.value })
            }
          />
          <label>Contact Number:</label>
          <input
            type="text"
            value={jobDoneBy.number}
            onChange={(e) =>
              setJobDoneBy({ ...jobDoneBy, number: e.target.value })
            }
          />
        </div>
        <button onClick={handleSubmit}>Submit Quotation</button>
      </div>

      <div className="right-section">
        <h2>Quotation Summary</h2>
        <p><strong>Invoice Number:</strong> {invoiceNumber}</p>
        <p><strong>Repair Date:</strong> {repairDate}</p>
        <p><strong>System Details:</strong> {systemDetails}</p>
        <p><strong>Job Done By:</strong> {jobDoneBy.name} - {jobDoneBy.number}</p>

        <h3>Newly Added Items</h3>
        <table className="items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h3>Old Quotation Items</h3>
        <table className="items-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {oldItems.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* QR Code Section */}
        <div>
          <h3>QR Code for Quotation</h3>
          <QRCodeCanvas value={qrData} />
        </div>
      </div>
    </div>
  );
};

export default BreakdownQuotation;
