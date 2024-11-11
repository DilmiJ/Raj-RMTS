import React, { useState } from 'react';
import '../css/JobSelectionPart.css';

const JobSelectionPart = () => {
  const [activeTab, setActiveTab] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="job-selection-part">
      <h1>Job Selection Part</h1>
      <div className="button-group">
        <button
          className={`tab-button ${activeTab === 'jobDetails' ? 'active' : ''}`}
          onClick={() => handleTabClick('jobDetails')}
        >
          Job Details
        </button>
        <button
          className={`tab-button ${activeTab === 'itemDetails' ? 'active' : ''}`}
          onClick={() => handleTabClick('itemDetails')}
        >
          Item Details
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'jobDetails' && (
          <form className="job-details-form">
            <h2>Job Details</h2>
            <label>
              User ID:
              <input type="text" name="userId" />
            </label>
            <label>
              Job Number:
              <input type="text" name="jobNumber" />
            </label>
            <label>
              Duration:
              <input type="text" name="duration" />
            </label>
            <label>
              Date:
              <input type="date" name="date" />
            </label>
            <label>
              Hours:
              <input type="number" name="hours" />
            </label>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        )}

        {activeTab === 'itemDetails' && (
          <div className="item-details">
            <p>Nothing here yet. I will create it soon.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobSelectionPart;
