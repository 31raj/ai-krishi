import { useState } from 'react';
import { Bell, MapPin } from 'lucide-react';

export default function Topbar({ title = 'Dashboard' }) {
  const [lang, setLang] = useState('EN');

  return (
    <header className="flex items-center justify-between gap-4 px-4 py-3 bg-transparent md:pl-6 md:pr-8">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold">{title}</h1>
        <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600 bg-white px-3 py-1 rounded-md shadow-sm">
          <MapPin className="w-4 h-4 text-slate-500" />
          <span>Ranchi, Jharkhand</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button onClick={() => setLang((l) => (l === 'EN' ? 'HI' : 'EN'))} className="px-3 py-1 rounded-md bg-white shadow-sm text-sm">
          {lang === 'EN' ? 'English' : 'हिन्दी'}
        </button>
        <button className="p-2 rounded-md bg-white shadow-sm"><Bell className="w-5 h-5" /></button>
        <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-md shadow-sm">
          <div className="w-8 h-8 rounded-full bg-agri-fresh flex items-center justify-center text-white">R</div>
        </div>
      </div>
    </header>
  );
}
