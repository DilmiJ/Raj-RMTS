import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Assemble from './Components/Assemble';
import CustomerDetails from './Components/CustomerDetails';
import JobSelection from './Components/JobSelection'; // Import the JobSelection component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assemble" element={<Assemble />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/job-selection" element={<JobSelection />} /> {/* New Route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
