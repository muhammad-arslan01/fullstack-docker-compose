import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [timestamp, setTimestamp] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHelloMessage();
  }, []);

  const fetchHelloMessage = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use environment variable or default to backend service name in Docker network
      const apiUrl = process.env.REACT_APP_API_URL || 'http://backend:3001';
      
      const response = await axios.get(apiUrl);
      setMessage(response.data.message);
      setTimestamp(response.data.timestamp);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to fetch data from backend. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchHelloMessage();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React + NestJS + PostgreSQL</h1>
        <h2>Docker Compose Application</h2>
        
        <div className="message-container">
          {loading && <p>Loading...</p>}
          
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <>
              <div className="message-box">
                <h3>Message from Backend:</h3>
                <p className="message">{message}</p>
                <p className="timestamp">Timestamp: {new Date(timestamp).toLocaleString()}</p>
              </div>
              
              <button onClick={handleRefresh} className="refresh-button">
                Refresh Message
              </button>
            </>
          )}
        </div>
        
        <div className="info">
          <p>This React app is communicating with a NestJS backend</p>
          <p>through Docker Compose internal network</p>
        </div>
      </header>
    </div>
  );
}

export default App;