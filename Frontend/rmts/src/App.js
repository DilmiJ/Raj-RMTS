import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Assemble from './Components/Assemble';
import CustomerDetails from './Components/CustomerDetails';
import JobSelection from './Components/JobSelection';
import MonitorView from './Components/MonitorView'; // Import MonitorView component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assemble" element={<Assemble />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/job-selection" element={<JobSelection />} />
          <Route path="/monitor-view" element={<MonitorView />} /> {/* Add this route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
