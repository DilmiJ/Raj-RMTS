import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Assemble from './Components/Assemble';
import CustomerDetails from './Components/CustomerDetails';
import JobSelection from './Components/JobSelection'; // Import JobSelection component
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />

          {/* Assemble page */}
          <Route path="/assemble" element={<Assemble />} />

          {/* Customer Details page */}
          <Route path="/customer-details" element={<CustomerDetails />} />

          {/* Job Selection page */}
          <Route path="/job-selection" element={<JobSelection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
