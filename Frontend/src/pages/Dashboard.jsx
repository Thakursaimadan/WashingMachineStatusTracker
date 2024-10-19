import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [machines, setMachines] = useState([]);
  const [studentInfo, setStudentInfo] = useState({ roll: '', name: '' });
  const [currentMachineId, setCurrentMachineId] = useState(null); // To track which machine is being toggled

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/machines');
        setMachines(response.data);
      } catch (error) {
        console.error('Failed to fetch machines:', error);
      }
    };
    fetchMachines();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const toggleStatus = async (id, status) => {
    if (status === 'Available') {
      // If status is "Available", set the machine ID for the input form
      setCurrentMachineId(id); 
    } else {
      // If status is "In Use", toggle back to "Available"
      await updateMachineStatus(id, 'Available');
      setCurrentMachineId(null); // Reset the current machine ID
    }
  };

  const updateMachineStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/machines/toggle/${id}`, {
        status: newStatus,
        roll: studentInfo.roll,
        name: studentInfo.name,
      });
      setMachines(machines.map((m) => (m._id === id ? { ...m, status: newStatus } : m)));
      setStudentInfo({ roll: '', name: '' }); // Clear input fields after submission
      setCurrentMachineId(null); // Hide the input fields after submission
    } catch (error) {
      console.error('Failed to toggle status:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentMachineId) {
      updateMachineStatus(currentMachineId, 'In Use');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <ul>
        {machines.map((machine) => (
          <li key={machine._id}>
            <p><strong>{machine.name}</strong>: {machine.status}</p>
            <button onClick={() => toggleStatus(machine._id, machine.status)}>
              Toggle Status
            </button>
            <a href={`/logs/${machine._id}`}>View Logs</a> | <a href={`/feedbacks/${machine._id}`}>View Feedback</a>
            {currentMachineId === machine._id && (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="roll"
                  placeholder="Roll Number"
                  value={studentInfo.roll}
                  onChange={handleInputChange}
                  required
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Student Name"
                  value={studentInfo.name}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
