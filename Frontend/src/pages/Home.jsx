import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [machines, setMachines] = useState([]);

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

  return (
    <div className="home">
      <h1>Available Washing Machines</h1>
      <ul>
        {machines.map((machine) => (
          <li key={machine._id}>
            <p><strong>{machine.name}</strong>: {machine.status}</p>
            <a href={`/feedback/${machine._id}`}>Give Feedback</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
