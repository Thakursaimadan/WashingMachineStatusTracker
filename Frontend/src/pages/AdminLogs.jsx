import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminLogs = ({ machineId }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/logs/${machineId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setLogs(response.data);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [machineId]);

  if (loading) return <p>Loading logs...</p>;

  return (
    <div className="logs-container">
      <h2>Usage Logs</h2>
      {logs.length === 0 ? (
        <p>No logs available</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              <p>
                <strong>Student Name:</strong> {log.studentName}
              </p>
              <p>
                <strong>Roll Number:</strong> {log.studentRoll}
              </p>
              <p>
                <strong>Start Time:</strong> {new Date(log.startTime).toLocaleString()}
              </p>
              <p>
                <strong>End Time:</strong>{' '}
                {log.endTime ? new Date(log.endTime).toLocaleString() : 'In Progress'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminLogs;
