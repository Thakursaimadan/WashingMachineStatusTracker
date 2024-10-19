import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams

const MachineLogs = () => {
  const { machineId } = useParams(); // Extract machineId from route parameters
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/machines/logs/${machineId}`);
        setLogs(response.data.logs);
      } catch (error) {
        console.error('Error fetching logs:', error);
      }
    };

    if (machineId) fetchLogs(); // Ensure machineId is valid before fetching logs
  }, [machineId]);

  return (
    <div>
      <h2> Logs for Machine </h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <p><strong>Name:</strong> {log.name} (Roll: {log.roll})</p>
            <small>{new Date(log.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default MachineLogs;
