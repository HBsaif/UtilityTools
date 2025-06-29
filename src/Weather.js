import React, { useState, useEffect } from 'react';

function Weather() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');

  useEffect(() => {
    fetch(`https://wttr.in/${city}?format=j1`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        setWeather(data);
        setError(null);
      })
      .catch(error => {
        console.error("Failed to fetch weather data:", error);
        setError("Failed to fetch weather data. Please try again later.");
        setWeather(null); // Clear weather data on error
      });
  }, [city]);

  const handleCityChange = (e) => {
    if (e.key === 'Enter') {
      setCity(e.target.value);
    }
  };

  return (
    <div className="card tool-container">
      <div className="card-body">
        <h5 className="card-title">Weather</h5>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Enter city and press Enter" onKeyDown={handleCityChange} />
        </div>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {weather && (
          <div>
            <h4>{weather.nearest_area[0].areaName[0].value}, {weather.nearest_area[0].country[0].value}</h4>
            <p>Currently: {weather.current_condition[0].weatherDesc[0].value}</p>
            <p>Temperature: {weather.current_condition[0].temp_C}°C</p>
            <p>Feels like: {weather.current_condition[0].FeelsLikeC}°C</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Weather;