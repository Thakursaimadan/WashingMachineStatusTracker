// src/pages/AddMachineForm.jsx
import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const AddMachineForm = () => {
  const [machineId, setMachineId] = useState('');

  const handleAddMachine = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/machines', { machineId, status: 'Available' });
      alert('Machine added successfully!');
    } catch (err) {
      console.error('Error adding machine', err);
    }
  };

  return (
    <form onSubmit={handleAddMachine} className="machine-form">
      <input
        type="text"
        placeholder="Machine ID"
        value={machineId}
        onChange={(e) => setMachineId(e.target.value)}
      />
      <button type="submit">Add Machine</button>
    </form>
  );
};

export default AddMachineForm;
