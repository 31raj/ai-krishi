import { useNavigate } from 'react-router-dom';
import QuickCard from '../components/QuickCard.jsx';
import ProgressRing from '../components/ProgressRing.jsx';
import { Camera, Cloud, Droplet, Cpu } from 'lucide-react';

export default function DashboardClean() {
  const navigate = useNavigate();

  const farm = {
    location: 'Ranchi, Jharkhand',
    temp: 31,
    humidity: 72,
    rainProb: 65,
    crop: 'Tomato',
    area: '2.5 Acres',
    stage: 'Flowering',
    soil: 'Loamy',
  };

  return (
    <div className="space-y-6">
      <section className="card flex flex-col md:flex-row items-center justify-between">
        <div>
          <div className="text-sm muted">Good Morning, Farmer 👋</div>
          <div className="text-2xl font-bold">Let's take care of your farm today.</div>
          <div className="muted mt-2">📍 {farm.location} • 🌤️ {farm.temp}°C • Humidity: {farm.humidity}% • Rain: {farm.rainProb}%</div>
        </div>

        <div className="mt-4 md:mt-0">
          <button onClick={() => navigate('/assistant')} className="btn-primary text-lg">Ask AI Krishi Mitra</button>
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <QuickCard Icon={Camera} title="Check Crop Health" description="Upload a plant photo and detect possible diseases." buttonText="Analyze Plant" />
        <QuickCard Icon={Cloud} title="Today's Weather" description="Get crop-specific weather recommendations." value={`${farm.temp}°C • ${farm.rainProb}%`} buttonText="View Weather" />
        <QuickCard Icon={Droplet} title="Irrigation Advice" description="Know when your crop may need water." value="Good — No immediate irrigation" />
        <QuickCard Icon={Cpu} title="Ask AI Assistant" description="Get simple farming guidance in your language." buttonText="Ask Now" />
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold">Today's Farm Recommendations</h3>
        <div className="mt-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🌧️</div>
            <div>
              <div className="font-medium">Rain expected tomorrow</div>
              <div className="text-sm muted">Consider delaying irrigation if soil moisture remains adequate.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-2xl">💧</div>
            <div>
              <div className="font-medium">Check soil moisture</div>
              <div className="text-sm muted">Review moisture levels before the next irrigation cycle.</div>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="text-2xl">🌱</div>
            <div>
              <div className="font-medium">Crop health check</div>
              <div className="text-sm muted">Upload a leaf photo if you notice unusual spots.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold">Farm Overview</h3>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="p-3 bg-agri-cream rounded">Crop<br/><strong>{farm.crop}</strong></div>
          <div className="p-3 bg-agri-cream rounded">Farm Area<br/><strong>{farm.area}</strong></div>
          <div className="p-3 bg-agri-cream rounded">Growth Stage<br/><strong>{farm.stage}</strong></div>
          <div className="p-3 bg-agri-cream rounded">Soil Type<br/><strong>{farm.soil}</strong></div>
        </div>
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold">Farm Health</h3>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-2">
            <div className="text-sm muted">Overall Farm Health</div>
            <div className="text-3xl font-bold">82%</div>
            <div className="mt-2 text-sm">Crop Health: 88% • Water Management: 76% • Disease Risk: Low</div>
          </div>
          <div className="flex items-center justify-center">
            <ProgressRing percent={82} size={96} />
          </div>
        </div>
      </section>
    </div>
  );
}
