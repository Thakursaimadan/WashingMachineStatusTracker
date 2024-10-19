import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './machineList.css'; // CSS for styling

const MachineList = () => {
  const [machines, setMachines] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [selectedMachineId, setSelectedMachineId] = useState(null);

  // Fetch machine data from the backend
  const fetchMachines = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/machines');
      setMachines(response.data);
    } catch (error) {
      console.error('Error fetching machines:', error);
    }
  };

  useEffect(() => {
    fetchMachines(); // Initial fetch

    // Optional: Polling every 10 seconds to keep the data up to date
    const intervalId = setInterval(() => {
      fetchMachines();
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Handle feedback submission
  const handleSubmitFeedback = async (machineId) => {
    try {
      await axios.post(`http://localhost:5000/api/machines/feedback/${machineId}`, { feedback });
      alert('Feedback submitted successfully!');
      setFeedback('');
      setSelectedMachineId(null);
      fetchMachines(); // Refresh data after feedback submission
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div className="machine-list-container">
      <header className="header">
        <h1>Available Washing Machines</h1>
        <Link to="/login">
          <button className="login-button">Admin Login</button>
        </Link>
      </header>

      <div className="machine-list">
        {machines.map((machine) => (
          <div className="machine-card" key={machine._id}>
            <h3>Machine ID: {machine.machineId}</h3>
            <p>Status: {machine.status === 'In Use' ? 'In Use' : 'Available'}</p>

            {/* Feedback Button */}
            <button
              className="feedback-button"
              onClick={() => setSelectedMachineId(machine._id)}
            >
              Give Feedback
            </button>

            {/* Feedback Form (Visible only when the feedback button is clicked) */}
            {selectedMachineId === machine._id && (
              <div className="feedback-form">
                <textarea
                  placeholder="Enter your feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                />
                <button
                  className="submit-feedback-button"
                  onClick={() => handleSubmitFeedback(machine._id)}
                >
                  Submit Feedback
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MachineList;
