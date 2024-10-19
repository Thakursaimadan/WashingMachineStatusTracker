const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema({
  machineId: { type: String, required: true, unique: true },
  status: { type: String, default: 'available' }, // 'available' or 'in use'
  logs: [
    {
      roll: String,
      name: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
  feedbacks: [
    {
      roll: String,
      name: String,
      feedback: String,
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Machine', machineSchema);
