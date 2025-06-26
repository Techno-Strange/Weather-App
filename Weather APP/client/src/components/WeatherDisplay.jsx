import axios from 'axios';

function WeatherDisplay({ weatherData }) {
  if (!weatherData) return null;

  const handleSave = async () => {
    try {
      await axios.post('/weather', weatherData);
      alert('City saved successfully!');
    } catch (error) {
      alert('Failed to save city');
    }
  };

  return (
    <div className="weather-card">
      <h2 className="text-xl font-semibold">{weatherData.city}</h2>
      <p>Temperature: {weatherData.weatherData.temperature}°C</p>
      <p>Description: {weatherData.weatherData.description}</p>
      <p>Humidity: {weatherData.weatherData.humidity}%</p>
      <p>Wind Speed: {weatherData.weatherData.windSpeed} m/s</p>
      <button onClick={handleSave} className="search-btn mt-2">
        Save City
      </button>
    </div>
  );
}

export default WeatherDisplay;