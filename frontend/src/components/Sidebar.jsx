import { NavLink } from 'react-router-dom';
import {
  Home,
  Camera,
  Cloud,
  Droplet,
  Cpu,
  Calendar,
  MapPin,
  Settings as SettingsIcon,
  LifeBuoy,
  User,
} from 'lucide-react';

const ITEMS = [
  { to: '/', label: 'Dashboard', Icon: Home },
  { to: '/disease', label: 'Disease Detection', Icon: Camera },
  { to: '/weather', label: 'Weather Advisory', Icon: Cloud },
  { to: '/irrigation', label: 'Irrigation', Icon: Droplet },
  { to: '/assistant', label: 'AI Assistant', Icon: Cpu },
  { to: '/farm-plan', label: '7-Day Farm Plan', Icon: Calendar },
  { to: '/my-farm', label: 'My Farm', Icon: MapPin },
  { to: '/settings', label: 'Settings', Icon: SettingsIcon },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-64 h-screen bg-white border-r">
      <div className="px-6 py-5 border-b">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌾</span>
          <div>
            <div className="font-bold text-lg">AI Krishi Mitra</div>
            <div className="text-sm text-slate-500">Smart decisions for better farming</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {ITEMS.map(({ to, label, Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-sm ${
                    isActive ? 'bg-agri-deep text-white' : 'text-slate-700 hover:bg-slate-100'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="px-4 py-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <User className="w-8 h-8 text-slate-700" />
            <div>
              <div className="text-sm font-medium">Raj Farmer</div>
              <div className="text-xs text-slate-500">Ranchi, Jharkhand</div>
            </div>
          </div>
          <button className="text-slate-500 hover:text-slate-700"><LifeBuoy className="w-5 h-5" /></button>
        </div>
      </div>
    </aside>
  );
}
