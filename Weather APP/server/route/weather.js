const express = require('express');
const axios = require('axios');
const City = require('../models/City');
const router = express.Router();

// GET /weather/:city - Fetch weather data from OpenWeatherMap
router.get('/:city', async (req, res) => {
  try {
    const city = req.params.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(url);
    const weatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed
    };
    
    res.json({ city: response.data.name, weatherData });
  } catch (error) {
    res.status(400).json({ error: error.response?.data?.message || 'City not found' });
  }
});

// POST /weather - Save city to MongoDB
router.post('/', async (req, res) => {
  try {
    const { name, weatherData } = req.body;
    const city = new City({ name, weatherData });
    await city.save();
    res.status(201).json(city);
  } catch (error) {
    res.status(400).json({ error: 'City already saved or invalid data' });
  }
});

// GET /weather - Retrieve all saved cities
router.get('/', async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /weather/:id - Delete a city
router.delete('/:id', async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ error: 'City not found' });
    res.json({ message: 'City deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;