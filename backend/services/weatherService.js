const weatherService = {
  async getWeather(location, coordinates = {}) {
    const hasCoordinates =
      Number.isFinite(Number(coordinates.latitude)) &&
      Number.isFinite(Number(coordinates.longitude));

    const latitudeValue = Number(coordinates.latitude);
    const longitudeValue = Number(coordinates.longitude);

    let place;

    if (hasCoordinates) {
      place = {
        latitude: latitudeValue,
        longitude: longitudeValue,
        name: location || 'Exact Location',
        country: 'India',
      };
    } else {
      const geoResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          location || 'Ranchi, Jharkhand'
        )}&count=1&language=en&format=json`
      );

      if (!geoResponse.ok) {
        throw new Error('Unable to find location');
      }

      const geoData = await geoResponse.json();

      if (!geoData.results || geoData.results.length === 0) {
        throw new Error(`Location "${location || 'Ranchi, Jharkhand'}" not found`);
      }

      place = geoData.results[0];
    }

    const { latitude, longitude, name, country } = place;

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,weather_code,wind_speed_10m&hourly=temperature_2m,precipitation_probability,relative_humidity_2m,soil_moisture_0_to_1m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,rain_sum&timezone=auto&forecast_days=7`
    );

    if (!weatherResponse.ok) {
      throw new Error('Unable to fetch weather data');
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;
    const daily = weatherData.daily;

    return {
      location: `${name}, ${country}`,
      coordinates: {
        latitude,
        longitude,
      },
      current: {
        temperature: current.temperature_2m,
        feelsLike: current.apparent_temperature,
        humidity: current.relative_humidity_2m,
        precipitation: current.precipitation,
        rain: current.rain,
        windSpeed: current.wind_speed_10m,
        weatherCode: current.weather_code,
        isDay: current.is_day,
      },
      forecast: daily.time.map((date, index) => ({
        date,
        maxTemperature: daily.temperature_2m_max[index],
        minTemperature: daily.temperature_2m_min[index],
        rainProbability: daily.precipitation_probability_max[index],
        rainAmount: daily.rain_sum[index],
        weatherCode: daily.weather_code[index],
      })),
      source: 'Open-Meteo',
      updatedAt: new Date().toISOString(),
    };
  },
};

export default weatherService;