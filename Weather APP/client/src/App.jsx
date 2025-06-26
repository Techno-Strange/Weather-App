import { useState } from 'react';
import WeatherSearch from './components/WeatherSearch';
import WeatherDisplay from './components/WeatherDisplay';
import SavedCities from './components/SavedCities';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  return (
    <div className="container">
      <h1 className="text-2xl font-bold mb-6">Weather App</h1>
      <WeatherSearch setWeatherData={setWeatherData} setError={setError} setLoading={setLoading} />
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      <WeatherDisplay weatherData={weatherData} />
      <SavedCities />
    </div>
  );
}

export default App;