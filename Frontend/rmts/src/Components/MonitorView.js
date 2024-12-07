
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/JobSelectionPart.css';

const JobSelectionPart = () => {
  const [activeTab, setActiveTab] = useState('jobDetails');
  const [items, setItems] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', price: '' });
  const [editItem, setEditItem] = useState({ id: '', name: '', price: '' });
  const [viewDetailsItem, setViewDetailsItem] = useState(null);
  const [newJob, setNewJob] = useState({
    userId: '',
    jobNumber: '',
    duration: '',
    date: '',
    hours: '',
  });

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, jobsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/items'),
          axios.get('http://localhost:5000/api/jobs'),
        ]);
        setItems(itemsResponse.data);
        setJobs(jobsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Add a new item
  const handleAddItem = async () => {
    if (!newItem.name || !newItem.price) {
      alert('Please fill out both fields for the new item.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/items', newItem);
      setItems([...items, response.data]);
      setNewItem({ name: '', price: '' });
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add the item. Please try again.');
    }
  };

  // Update an existing item
  const handleUpdateItem = async () => {
    if (!editItem.name || !editItem.price) {
      alert('Please fill out both fields for updating the item.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/items/${editItem.id}`, editItem);
      setItems(items.map((item) => (item._id === editItem.id ? response.data : item)));
      setEditItem({ id: '', name: '', price: '' });
    } catch (error) {
      console.error('Error updating item:', error);
      alert('Failed to update the item. Please try again.');
    }
  };

  // Delete an item
  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/items/${id}`);
      setItems(items.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete the item. Please try again.');
    }
  };

  // View item details
  const handleViewDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/items/${id}`);
      setViewDetailsItem(response.data);
    } catch (error) {
      console.error('Error fetching item details:', error);
    }
  };

  // Add a new job
  const handleAddJob = async () => {
    if (Object.values(newJob).some((value) => !value)) {
      alert('Please fill out all fields for the new job.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/jobs', newJob);
      setJobs([...jobs, response.data]);
      setNewJob({ userId: '', jobNumber: '', duration: '', date: '', hours: '' });
    } catch (error) {
      console.error('Error adding job:', error);
      alert('Failed to add the job. Please try again.');
    }
  };

  // Update a job
  const handleUpdateJob = async () => {
    if (!newJob.id || Object.values(newJob).some((value) => !value)) {
      alert('Please fill out all fields to update the job.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/api/jobs/${newJob.id}`, newJob);
      setJobs(jobs.map((job) => (job._id === newJob.id ? response.data : job)));
      setNewJob({ userId: '', jobNumber: '', duration: '', date: '', hours: '' });
      alert('Job updated successfully!');
    } catch (error) {
      console.error('Error updating job:', error);
      alert('Failed to update the job. Please try again.');
    }
  };

  // Delete a job
  const handleDeleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error('Error deleting job:', error);
      alert('Failed to delete the job. Please try again.');
    }
  };

  // View job details
  const handleViewJob = (job) => {
    setViewDetailsItem(job);
  };

  const setEditJob = (job) => {
    setNewJob({
      userId: job.userId,
      jobNumber: job.jobNumber,
      duration: job.duration,
      date: job.date,
      hours: job.hours,
      id: job._id,
    });
  };

 return (
    <div className="job-selection-part">
      <h1>Job Selection Part</h1>
      <div className="button-group">
        <button
          className={`tab-button ${activeTab === 'jobDetails' ? 'active' : ''}`}
          onClick={() => setActiveTab('jobDetails')}
        >
          Job Details
        </button>
        <button
          className={`tab-button ${activeTab === 'itemDetails' ? 'active' : ''}`}
          onClick={() => setActiveTab('itemDetails')}
        >
          Item Details
        </button>
      </div>

      {activeTab === 'jobDetails' && (
  <div className="job-details">
    <h2>Job Details</h2>
    <form>
      {['userId', 'jobNumber', 'duration', 'date', 'hours'].map((field) => (
        <label key={field}>
          {field.charAt(0).toUpperCase() + field.slice(1)}:
          <input
            type={field === 'date' ? 'date' : field === 'hours' ? 'number' : 'text'}
            value={newJob[field]}
            onChange={(e) => setNewJob({ ...newJob, [field]: e.target.value })}
          />
        </label>
      ))}
      <button type="button" onClick={handleAddJob}>
        Add Job
      </button>
      {newJob.id && (
  <button type="button" onClick={handleUpdateJob}>
    Update Job
  </button>
)}

    </form>

    <h3>All Jobs</h3>
    <div className="job-list">
      {jobs.length > 0 ? (
        <table className="job-table">
          <thead>
            <tr>
              <th>Job Number</th>
              <th>User ID</th>
              <th>Duration (hrs)</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.jobNumber}</td>
                <td>{job.userId}</td>
                <td>{job.duration}</td>
                <td>{job.date}</td>
                <td>{job.hours}</td>
                <td>
                  <button onClick={() => handleViewJob(job)}>View</button>
                  <button onClick={() => setEditJob(job)}>Edit</button>
                  <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  </div>
)}







     {activeTab === 'itemDetails' && (
          <div className="item-details">
            <h2>Item Details</h2>
            <div className="item-list">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item._id} className="item">
                    <p>
                      <strong>{item.name}</strong> - ${item.price}
                    </p>
                    <button onClick={() => handleViewDetails(item._id)}>View Details</button>
                    <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                    <button onClick={() => setEditItem({ id: item._id, name: item.name, price: item.price })}>
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <p>No items available.</p>
              )}
            </div>

           <div className="job-list">
  <h3>Job List</h3>
  {jobs.length > 0 ? (
    jobs.map((job) => (
      <div key={job._id} className="job">
        <p>
          <strong>{job.jobNumber}</strong> - {job.duration} hours
        </p>
        <p>{job.date}</p>
        <button onClick={() => handleViewJob(job)}>View</button>
        <button onClick={() => setEditJob(job)}>Edit</button>
        <button onClick={() => handleDeleteJob(job._id)}>Delete</button>
      </div>
    ))
  ) : (
    <p>No jobs found.</p>
  )}

{viewDetailsItem && (
  <div className="job-details-popup">
    <h3>Job Details</h3>
    <p>
      <strong>Job Number:</strong> {viewDetailsItem.jobNumber}
    </p>
    <p>
      <strong>User ID:</strong> {viewDetailsItem.userId}
    </p>
    <p>
      <strong>Duration:</strong> {viewDetailsItem.duration} hours
    </p>
    <p>
      <strong>Date:</strong> {viewDetailsItem.date}
    </p>
    <p>
      <strong>Hours:</strong> {viewDetailsItem.hours}
    </p>
    <button onClick={() => setViewDetailsItem(null)}>Close</button>
  </div>
)}

{newJob.id && (
  <form>
    <h3>Edit Job</h3>
    {['userId', 'jobNumber', 'duration', 'date', 'hours'].map((field) => (
      <label key={field}>
        {field.charAt(0).toUpperCase() + field.slice(1)}:
        <input
          type={field === 'date' ? 'date' : field === 'hours' ? 'number' : 'text'}
          value={newJob[field]}
          onChange={(e) => setNewJob({ ...newJob, [field]: e.target.value })}
        />
      </label>
    ))}
    <button type="button" onClick={handleUpdateJob}>
      Update Job
    </button>
  </form>
)}

</div>


          </div>
        )}

        {activeTab === 'itemDetails' && (
          <div className="item-details">
            <h2>Item Details</h2>
            <div className="item-list">
              {items.length > 0 ? (
                items.map((item) => (
                  <div key={item._id} className="item">
                    <p>
                      <strong>{item.name}</strong> - ${item.price}
                    </p>
                    <button onClick={() => handleViewDetails(item._id)}>View Details</button>
                    <button onClick={() => handleDeleteItem(item._id)}>Delete</button>
                    <button onClick={() => setEditItem({ id: item._id, name: item.name, price: item.price })}>
                      Update
                    </button>
                  </div>
                ))
              ) : (
                <p>No items available.</p>
              )}
            </div>

            <div className="add-item">
              <h3>Add New Item</h3>
              {['name', 'price'].map((field) => (
                <input
                  key={field}
                  type="text"
                  placeholder={`Item ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                  value={newItem[field]}
                  onChange={(e) => setNewItem({ ...newItem, [field]: e.target.value })}
                />
              ))}
              <button onClick={handleAddItem}>Add Item</button>
            </div>

            <div className="edit-item">
              <h3>Edit Item</h3>
              {['name', 'price'].map((field) => (
                <input
                  key={field}
                  type="text"
                  value={editItem[field]}
                  onChange={(e) => setEditItem({ ...editItem, [field]: e.target.value })}
                />
              ))}
              <button onClick={handleUpdateItem}>Update Item</button>
            </div>

            {viewDetailsItem && (
              <div className="item-details-popup">
                <h3>Item Details</h3>
                <p>
                  <strong>Name:</strong> {viewDetailsItem.name}
                </p>
                <p>
                  <strong>Price:</strong> ${viewDetailsItem.price}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    
  );
};

export default JobSelectionPart;

