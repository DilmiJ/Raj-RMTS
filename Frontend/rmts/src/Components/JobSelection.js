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
          <form>
            <input style={styles.input} type="text" placeholder="Name" required />
            <input style={styles.input} type="text" placeholder="Job Number" required />
            <input style={styles.input} type="text" placeholder="User ID Number" required />
            <input style={styles.input} type="date" placeholder="Receiving Date" required />
            <input style={styles.input} type="date" placeholder="Delivery Date" required />
            <input style={styles.input} type="date" placeholder="Workout Date" required />
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        </div>
      )}

      {showItemForm && (
        <div style={styles.formContainer}>
          <h3>Item Form</h3>
          <form>
            <input style={styles.input} type="text" placeholder="Machine Type" required />
            <input style={styles.input} type="text" placeholder="Machine Model Number" required />
            <input style={styles.input} type="text" placeholder="Manufacture Country" required />
            <input style={styles.input} type="text" placeholder="Serial Number" required />
            <button type="submit" style={styles.submitButton}>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  jobSelectionContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
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
    transition: 'background-color 0.3s',
  },
  formContainer: {
    backgroundColor: 'darkgray',
    padding: '20px',
    borderRadius: '5px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    marginBottom: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid gray',
    width: '100%',
    boxSizing: 'border-box',
  },
};

export default JobSelection;
