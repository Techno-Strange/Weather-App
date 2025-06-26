import { useState } from 'react';
import axios from 'axios';

function WeatherSearch({ setWeatherData, setError, setLoading }) {
  const [city, setCity] = useState('');

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`/weather/${city}`);
      setWeatherData(response.data);
      setCity('');
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="input-field"
      />
      <button onClick={handleSearch} className="search-btn">
        Search
      </button>
    </div>
  );
}

export default WeatherSearch;