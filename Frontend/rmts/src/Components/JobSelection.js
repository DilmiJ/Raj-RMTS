import React, { useState } from 'react';

const JobSelection = () => {
  const [showJobForm, setShowJobForm] = useState(false);
  const [showItemForm, setShowItemForm] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleShowJobForm = () => {
    setShowJobForm(true);
    setShowItemForm(false);
  };

  const handleShowItemForm = () => {
    setShowJobForm(false);
    setShowItemForm(true);
  };

  const handleAddJob = (event) => {
    event.preventDefault();
    const newJob = {
      id: Date.now(),
      name: event.target.name.value,
      jobNumber: event.target.jobNumber.value,
      userId: event.target.userId.value,
      receivingDate: event.target.receivingDate.value,
      deliveryDate: event.target.deliveryDate.value,
      workoutDate: event.target.workoutDate.value,
    };
    setJobs([...jobs, newJob]);
    event.target.reset(); // Reset the form
  };

  const handleDeleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
  };

  const handleUpdateJob = (jobId) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, name: `${job.name} (Updated)` } : job
    );
    setJobs(updatedJobs);
  };

  const handleViewJob = (job) => {
    alert(`Job Details:\nName: ${job.name}\nJob Number: ${job.jobNumber}`);
  };

  return (
    <div style={styles.jobSelectionContainer}>
      <div style={styles.buttonContainer}>
        <button style={styles.squareButton} onClick={handleShowJobForm}>
          Job Details
        </button>
        <button style={styles.squareButton} onClick={handleShowItemForm}>
          Item Details
        </button>
      </div>

      {showJobForm && (
        <div style={styles.formContainer}>
          <h3>Job Scheduling Form</h3>
          <form onSubmit={handleAddJob}>
            <input name="name" style={styles.input} type="text" placeholder="Name" required />
            <input name="jobNumber" style={styles.input} type="text" placeholder="Job Number" required />
            <input name="userId" style={styles.input} type="text" placeholder="User ID Number" required />
            <input name="receivingDate" style={styles.input} type="date" required />
            <input name="deliveryDate" style={styles.input} type="date" required />
            <input name="workoutDate" style={styles.input} type="date" required />
            <button type="submit" style={styles.submitButton}>Add Job</button>
          </form>
        </div>
      )}

      {/* Job List */}
      <div style={styles.jobListContainer}>
        {jobs.map((job) => (
          <div key={job.id} style={styles.jobCard}>
            <p><strong>Job Number:</strong> {job.jobNumber}</p>
            <p><strong>Name:</strong> {job.name}</p>
            <p><strong>Receiving Date:</strong> {job.receivingDate}</p>
            <div style={styles.buttonGroup}>
              <button style={styles.actionButton} onClick={() => handleViewJob(job)}>View</button>
              <button style={styles.actionButton} onClick={() => handleUpdateJob(job.id)}>Update</button>
              <button style={styles.deleteButton} onClick={() => handleDeleteJob(job.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  jobSelectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  buttonContainer: {
    marginBottom: '20px',
  },
  squareButton: {
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    margin: '0 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  submitButton: {
    backgroundColor: 'orange',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    marginTop: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  formContainer: {
    backgroundColor: '#333',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  jobListContainer: {
    marginTop: '20px',
    width: '80%',
  },
  jobCard: {
    backgroundColor: '#444',
    padding: '15px',
    borderRadius: '5px',
    marginBottom: '10px',
    color: 'white',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  actionButton: {
    backgroundColor: 'gray',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginRight: '5px',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid gray',
    width: '100%',
    backgroundColor: '#555',
    color: 'white',
  },
};

export default JobSelection;
