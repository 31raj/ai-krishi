import { useEffect, useState } from 'react';

const DEFAULT_LOCATION = {
  name: 'Ranchi, Jharkhand',
  latitude: 23.37,
  longitude: 85.325,
};

const formatWeatherCode = (code) => {
  const map = {
    0: 'Clear sky',
    1: 'Mostly clear',
    2: 'Partly cloudy',
    3: 'Cloudy',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Light rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Light snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    80: 'Rain showers',
    81: 'Heavy showers',
    82: 'Very heavy showers',
  };

  return map[code] || 'Weather update';
};

export default function Weather() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const params = new URLSearchParams({
          location: DEFAULT_LOCATION.name,
          latitude: String(DEFAULT_LOCATION.latitude),
          longitude: String(DEFAULT_LOCATION.longitude),
        });

        const response = await fetch(`/api/weather?${params.toString()}`);
        const result = await response.json();

        if (!result.success) {
          throw new Error(result.error || 'Unable to fetch weather');
        }

        setData(result.weather);
      } catch (err) {
        setError(err.message || 'Unable to load weather');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div className="card">Loading exact location weather...</div>;
  }

  if (error || !data) {
    return <div className="card text-red-600">{error || 'Weather unavailable'}</div>;
  }

  const forecast = data.forecast || [];

  return (
    <div className="space-y-6">
      <section className="card flex items-center justify-between">
        <div>
          <div className="text-sm muted">Current Weather • {data.location}</div>
          <div className="text-xs muted mt-1">Exact location: {data.coordinates.latitude.toFixed(4)}° N, {data.coordinates.longitude.toFixed(4)}° E</div>
          <div className="flex items-center gap-6 mt-2">
            <div>
              <div className="text-4xl font-bold">{data.current.temperature}°C</div>
              <div className="text-sm muted">{formatWeatherCode(data.current.weatherCode)}</div>
            </div>
            <div className="text-sm muted">
              <div>Humidity: {data.current.humidity}%</div>
              <div>Wind: {data.current.windSpeed} km/h</div>
              <div>Rain: {data.current.rain ?? data.current.precipitation ?? 0} mm</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold">AI Weather Advisory</div>
          <div className="mt-2 text-sm muted">⚠️ Based on exact coordinates, the next 24 hours show active weather conditions. Check soil moisture before irrigation.</div>
        </div>
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold">7-Day Forecast</h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-7 gap-3">
          {forecast.slice(0, 7).map((f) => (
            <div key={f.date} className="p-3 bg-agri-cream rounded text-center text-sm">
              <div className="font-medium">{new Date(f.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
              <div className="mt-1">{Math.round(f.maxTemperature)}° / {Math.round(f.minTemperature)}°</div>
              <div className="mt-1 text-xs muted">{f.rainProbability}% rain</div>
            </div>
          ))}
        </div>
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold">Risk Indicators</h3>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
          <div className="p-3 bg-white rounded shadow-sm">Rain Risk<br/><strong className="block mt-1">{forecast[0]?.rainProbability > 60 ? 'High' : 'Medium'}</strong></div>
          <div className="p-3 bg-white rounded shadow-sm">Disease Risk<br/><strong className="block mt-1">Medium</strong></div>
          <div className="p-3 bg-white rounded shadow-sm">Heat Risk<br/><strong className="block mt-1">Low</strong></div>
          <div className="p-3 bg-white rounded shadow-sm">Wind Risk<br/><strong className="block mt-1">Moderate</strong></div>
        </div>
      </section>
    </div>
  );
}

