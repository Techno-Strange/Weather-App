import { useEffect, useState } from 'react';
import axios from 'axios';

function SavedCities() {
  const [cities, setCities] = useState([]);

  const fetchCities = async () => {
    try {
      const response = await axios.get('/weather');
      setCities(response.data);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/weather/${id}`);
      setCities(cities.filter((city) => city._id !== id));
    } catch (error) {
      console.error('Failed to delete city:', error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Saved Cities</h2>
      {cities.length === 0 ? (
        <p>No cities saved yet.</p>
      ) : (
        cities.map((city) => (
          <div key={city._id} className="saved-city">
            <span>{city.name} (Saved: {new Date(city.timestamp).toLocaleDateString()})</span>
            <button onClick={() => handleDelete(city._id)} className="delete-btn">
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedCities;