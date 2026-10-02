import { useState } from 'react';

export default function Irrigation() {
  const [soilMoisture, setSoilMoisture] = useState('');
  const [cropType, setCropType] = useState('Wheat');
  const [recommendation, setRecommendation] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/irrigation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ soilMoisture, cropType }),
    });
    const data = await response.json();
    if (data.success) setRecommendation(data.recommendation);
  };

  return (
    <section>
      <h2>Irrigation</h2>
      <form onSubmit={submit}>
        <label>
          Soil moisture (%)
          <input value={soilMoisture} onChange={(e) => setSoilMoisture(e.target.value)} type="number" min="0" max="100" />
        </label>
        <label>
          Crop type
          <input value={cropType} onChange={(e) => setCropType(e.target.value)} />
        </label>
        <button type="submit">Get recommendation</button>
      </form>
      {recommendation && <p>{recommendation}</p>}
    </section>
  );
}
