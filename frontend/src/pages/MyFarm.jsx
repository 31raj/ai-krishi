export default function MyFarm() {
  return (
    <section className="card">
      <h2 className="text-xl font-semibold">My Farm</h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-agri-cream rounded-md">
          <div className="text-sm text-slate-600">Farm Name</div>
          <div className="text-lg font-bold">Raj Farm</div>
        </div>
        <div className="p-4 bg-agri-cream rounded-md">
          <div className="text-sm text-slate-600">Location</div>
          <div className="text-lg font-bold">Ranchi, Jharkhand</div>
          <div className="mt-1 text-sm text-slate-600">23.3700° N, 85.3250° E</div>
        </div>
      </div>
      <div className="mt-6">
        <button className="btn-primary">Edit Farm Details</button>
      </div>
    </section>
  );
}
