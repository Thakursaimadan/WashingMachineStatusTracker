const express = require('express');
const Machine = require('../schema/machine');
const { authenticateToken } = require('./adminRoute');

const Machinerouter = express.Router();

// Route to add a new washing machine (only admin)
Machinerouter.post('/add', authenticateToken, async (req, res) => {
  try {
    const { machineId, status } = req.body;

    const newMachine = new Machine({ machineId, status });
    await newMachine.save();

    res.status(201).json({ message: 'Washing machine added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add washing machine' });
  }
});

// Get all machines' status
Machinerouter.get('/', async (req, res) => {
  try {
    const machines = await Machine.find();
    res.json(machines);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching machine data' });
  }
});

// Update machine status (admin only)
Machinerouter.put('/toggle/:id', async (req, res) => {
  try {
    //console.log("entered toogke id in backend")
    const { id } = req.params;
    const { status, roll, name } = req.body;

    const machine = await Machine.findById(id);
    if (!machine) return res.status(404).json({ error: 'Machine not found' });

    if (status === 'In Use') {
      // Add student details to usageLogs when turned on
      machine.logs.push({
        name,
        roll,
      });
      machine.status = 'In Use';

    } else {
      // Set end time on last log entry when turned off
      const lastLog = machine.logs[machine.logs.length - 1];
      if (lastLog) lastLog.endTime = new Date();

      machine.status = 'Available';
    }

    await machine.save();
    res.json({ message: 'Machine status updated', machine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update machine status' });
  }
});

Machinerouter.get('/logs/:machineId',async (req, res) => {
  const { machineId } = req.params;
  try {
    const machine = await Machine.findById(machineId);
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    const logs = machine.logs.map((log) => ({
      roll: log.roll,
      name: log.name,
      timestamp: log.timestamp,
    }));
    //console.log("logs ",logs)
    res.status(200).json({ logs });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({ error: 'Failed to retrieve logs' });
  }
});


Machinerouter.post('/feedback/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { feedback } = req.body;
    

    const machine = await Machine.findById(id);
    if (!machine) return res.status(404).json({ error: 'Machine not found' });
    console.log("the comment is ",feedback)
    machine.feedbacks.push({ feedback });
    await machine.save();

    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});
Machinerouter.get('/feedback/:id',async (req, res) => {
  console.log("in my router to get feedbacks")
  const { id } = req.params;
  try {
    const machine = await Machine.findById(id);
    console.log("enter the route to fetch feedbacks")
    if (!machine) {
      return res.status(404).json({ error: 'Machine not found' });
    }
    const feedbacks = machine.feedbacks.map((fb) => ({
      
      feedback: fb.feedback,
    }));
    res.status(200).json({ feedbacks });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ error: 'Failed to retrieve feedback' });
  }
});
module.exports = {Machinerouter};
