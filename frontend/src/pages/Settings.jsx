export default function Settings() {
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">Settings</h2>
      <div className="mt-4 space-y-4">
        <div>
          <div className="text-sm text-slate-600">Language</div>
          <div className="mt-2">
            <button className="px-3 py-1 mr-2 bg-white rounded-md">English</button>
            <button className="px-3 py-1 bg-white rounded-md">हिन्दी</button>
          </div>
        </div>
        <div>
          <div className="text-sm text-slate-600">Notifications</div>
          <div className="mt-2 text-sm">Weather alerts, Disease alerts, Irrigation reminders</div>
        </div>
      </div>
    </section>
  );
}
