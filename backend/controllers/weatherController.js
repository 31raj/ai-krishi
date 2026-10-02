import weatherService from '../services/weatherService.js';

export async function handleWeather(req, res) {
  try {
    const { location, latitude, longitude } = req.query;
    const weather = await weatherService.getWeather(location || 'Ranchi, Jharkhand', {
      latitude,
      longitude,
    });
    res.json({ success: true, weather });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Unable to fetch weather data' });
  }
}
