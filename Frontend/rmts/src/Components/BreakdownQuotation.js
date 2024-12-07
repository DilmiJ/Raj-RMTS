import React, { useState } from "react";

const BreakdownQuotation = () => {
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [oldItems, setOldItems] = useState("");
  const [newlyAddedItems, setNewlyAddedItems] = useState("");
  const [repairingDate, setRepairingDate] = useState("");
  const [issueDescription, setIssueDescription] = useState("");
  const [jobPersonName, setJobPersonName] = useState("");
  const [jobPersonId, setJobPersonId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
      invoiceNumber,
      oldItems,
      newlyAddedItems,
      repairingDate,
      issueDescription,
      jobPersonName,
      jobPersonId,
    };
    
    // Display or submit the form data (for now, we're logging it to the console)
    console.log(formData);
    
    // Clear form after submission
    setInvoiceNumber("");
    setOldItems("");
    setNewlyAddedItems("");
    setRepairingDate("");
    setIssueDescription("");
    setJobPersonName("");
    setJobPersonId("");
  };

  return (
    <div>
      <h2>Breakdown Quotation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Invoice Number:</label>
          <input
            type="text"
            value={invoiceNumber}
            onChange={(e) => setInvoiceNumber(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Old Items:</label>
          <textarea
            value={oldItems}
            onChange={(e) => setOldItems(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Newly Added Items:</label>
          <textarea
            value={newlyAddedItems}
            onChange={(e) => setNewlyAddedItems(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Repairing Date:</label>
          <input
            type="date"
            value={repairingDate}
            onChange={(e) => setRepairingDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label>What Happened to the System:</label>
          <textarea
            value={issueDescription}
            onChange={(e) => setIssueDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Job Done By (Person Name):</label>
          <input
            type="text"
            value={jobPersonName}
            onChange={(e) => setJobPersonName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Job Done By (Person ID):</label>
          <input
            type="text"
            value={jobPersonId}
            onChange={(e) => setJobPersonId(e.target.value)}
            required
          />
        </div>

        <button type="submit">Submit Quotation</button>
      </form>
    </div>
  );
};

export default BreakdownQuotation;
