import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/DashboardClean.jsx';
import DiseaseDetection from './pages/DiseaseDetection.jsx';
import Weather from './pages/Weather.jsx';
import Irrigation from './pages/Irrigation.jsx';
import Assistant from './pages/Assistant.jsx';
import FarmPlan from './pages/FarmPlan.jsx';
import MyFarm from './pages/MyFarm.jsx';
import Settings from './pages/Settings.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';

function PageWrapper({ children }) {
  const location = useLocation();
  const titleMap = {
    '/': 'Dashboard',
    '/disease': 'AI Crop Disease Detection',
    '/weather': 'Weather & Crop Advisory',
    '/irrigation': 'Smart Irrigation',
    '/assistant': 'AI Assistant',
    '/farm-plan': '7-Day Farm Plan',
    '/my-farm': 'My Farm',
    '/settings': 'Settings',
  };

  const title = titleMap[location.pathname] || 'AI Krishi Mitra';

  return (
    <div className="min-h-screen md:grid md:grid-cols-[18rem_1fr]">
      <Sidebar />
      <div className="flex flex-col">
        <Topbar title={title} />
        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Dashboard />
            </PageWrapper>
          }
        />
        <Route
          path="/disease"
          element={
            <PageWrapper>
              <DiseaseDetection />
            </PageWrapper>
          }
        />
        <Route
          path="/weather"
          element={
            <PageWrapper>
              <Weather />
            </PageWrapper>
          }
        />
        <Route
          path="/irrigation"
          element={
            <PageWrapper>
              <Irrigation />
            </PageWrapper>
          }
        />
        <Route
          path="/assistant"
          element={
            <PageWrapper>
              <Assistant />
            </PageWrapper>
          }
        />
        <Route
          path="/farm-plan"
          element={
            <PageWrapper>
              <FarmPlan />
            </PageWrapper>
          }
        />
        <Route
          path="/my-farm"
          element={
            <PageWrapper>
              <MyFarm />
            </PageWrapper>
          }
        />
        <Route
          path="/settings"
          element={
            <PageWrapper>
              <Settings />
            </PageWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
