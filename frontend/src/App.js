import React, { useState } from 'react';

const API_KEY = "process.env.REACT_APP_API_KEY";

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const fetchWeather = () => {
    if (!city) {
      setError("請輸入城市名稱");
      return;
    }
    setError('');
    setWeather(null);

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)
      .then(res => {
        if (!res.ok) {
          throw new Error('查無此城市');
        }
        return res.json();
      })
      .then(data => {
        setWeather(data);
        setError('');
      })
      .catch(err => {
        setError(err.message);
        setWeather(null);
      });
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>天氣查詢 App</h2>
      <input
        type="text"
        placeholder="請輸入英文城市名稱"
        value={city}
        onChange={e => setCity(e.target.value)}
        style={{ width: "100%", padding: 8, fontSize: 16 }}
      />
      <button onClick={fetchWeather} style={{ marginTop: 10, padding: 10, width: "100%" }}>
        查詢天氣
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: 20, textAlign: 'left' }}>
          <h3>{weather.name} 天氣</h3>
          <p>天氣狀態: {weather.weather[0].description}</p>
          <p>溫度: {weather.main.temp} °C</p>
          <p>濕度: {weather.main.humidity} %</p>
          <p>風速: {weather.wind.speed} 公尺/秒</p>
        </div>
      )}
    </div>
  );
}

export default App;
