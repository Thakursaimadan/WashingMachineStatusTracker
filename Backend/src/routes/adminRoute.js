const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../schema/admin');
const machine = require('../schema/machine');

const Adminrouter = express.Router();
const SECRET = process.env.JWT_SECRET;

Adminrouter.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating admin' });
  }
});

// Admin login
Adminrouter.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (!admin) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set the token in an HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // Set to true in production if using HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.log('Error during login:', error); // Log the error to console
    res.status(500).json({ error: 'Login failed' });
  }
});


// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const token = req.cookies.token || req.header('Authorization')?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = verified;
    next();
  } catch (error) {
    console.log("the error is ",error)
    res.status(400).json({ error: 'Invalid token' });
  }
}
Adminrouter.get('/logs/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const machine = await machine.findById(id).select('usageLogs');

    if (!machine) return res.status(404).json({ error: 'Machine not found' });

    res.json(machine.logs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});



module.exports = { Adminrouter, authenticateToken };
