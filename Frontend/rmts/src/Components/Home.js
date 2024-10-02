import React, { useState, useEffect } from 'react';
import '../css/Home.css'; // Importing the CSS file

const Home = () => {
  const [loading, setLoading] = useState(true); // State for loading effect

  // Simulate loading effect with useEffect hook
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Hide loading after 3 seconds
    }, 3000); // Adjust the time as needed (3 seconds)

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading">RMTS</div> {/* Loading animation */}
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Header with company name and logo */}
      <header className="header">
        <h1 className="company-name">RMTS Company</h1>
        <div className="company-logo"> {/* Placeholder for logo */} </div>
      </header>

      {/* Main content with buttons */}
      <main>
        <div className="button-container">
          <div className="button" id="assemble" onClick={() => window.location.href='/assemble'}>
            <span className="icon">➕</span>
            <span>Assemble</span>
          </div>
          <div className="button" id="service" onClick={() => window.location.href='/service'}>
            <span className="icon">🔩</span>
            <span>Service</span>
          </div>
          <div className="button" id="repair" onClick={() => window.location.href='/repair'}>
            <span className="icon">🛠️</span>
            <span>Repairing</span>
          </div>
          <div className="button" id="breakdown" onClick={() => window.location.href='/breakdown'}>
            <span className="icon">⚙️</span>
            <span>Breakdown</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 RMTS Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
