// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Assemble from './Components/Assemble';
import CustomerDetails from './Components/CustomerDetails';
import JobSelection from './Components/JobSelection';
import MonitorView from './Components/MonitorView';
import BreakdownQuotation from './Components/BreakdownQuotation';
import ServicePage from './Components/ServicePage';
import RepairingForm from './Components/RepairingForm'; // Import RepairingForm

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assemble" element={<Assemble />} />
          <Route path="/customer-details" element={<CustomerDetails />} />
          <Route path="/job-selection" element={<JobSelection />} />
          <Route path="/monitor-view" element={<MonitorView />} />
          <Route path="/breakdown" element={<BreakdownQuotation />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/repair" element={<RepairingForm />} /> {/* Add route for "/repair" */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
