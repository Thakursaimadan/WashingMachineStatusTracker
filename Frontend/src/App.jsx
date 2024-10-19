import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddMachineForm from './pages/AddMachineForm';
import ViewFeedback from './pages/ViewFeedback'
import ViewLogs from './pages/ViewLogs'
import MachineList from './pages/MachineList'; // New component for machine viewing page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MachineList />} />  {/* Default route */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-machine" element={<AddMachineForm />} />
        <Route path="/feedbacks/:machineId" element={< ViewFeedback/>} />
        <Route path="/logs/:machineId" element={< ViewLogs/>} />
      </Routes>
    </Router>
  );
};

export default App;
