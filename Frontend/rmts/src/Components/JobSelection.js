import React, { useState } from 'react';
//import '../css/jobSelection.css'; // Ensure this links to your CSS file

const JobSelection = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);

  const handleShowJobForm = () => {
    setShowJobForm(true);
    setShowItemForm(false);
  };

  const handleShowItemForm = () => {
    setShowJobForm(false);
    setShowItemForm(true);
  };

  return (
    <div className="job-selection-container">
      <div className="button-container">
        <button className="square-button job-button" onClick={handleShowJobForm}>
          Job Details
        </button>
        <button className="square-button item-button" onClick={handleShowItemForm}>
          Item Details
        </button>
      </div>

      {showJobForm && (
        <div className="form-container">
          <h3>Job Scheduling Form</h3>
          <form>
            <input type="text" placeholder="Job Title" required />
            <input type="text" placeholder="Worker Name" required />
            <input type="date" required />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      )}

      {showItemForm && (
        <div className="form-container">
          <h3>Item Form</h3>
          <form>
            <input type="text" placeholder="Item Name" required />
            <input type="number" placeholder="Quantity" required />
            <input type="text" placeholder="Price" required />
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default JobSelection;
