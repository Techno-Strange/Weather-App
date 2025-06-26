const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  weatherData: {
    temperature: Number,
    description: String,
    humidity: Number,
    windSpeed: Number
  },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('City', citySchema);