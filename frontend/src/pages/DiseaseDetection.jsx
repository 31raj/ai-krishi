import { useState, useRef } from 'react';

const SAMPLE = {
  crop: 'Tomato',
  issue: 'Early Blight',
  confidence: 91,
  risk: 'Medium',
  symptoms: ['Dark spots on leaves', 'Yellowing around affected areas', 'Progressive leaf damage'],
  steps: [
    'Inspect nearby plants.',
    'Remove severely affected leaves where appropriate.',
    'Avoid unnecessary overhead watering.',
    'Monitor the crop for further spread.',
  ]
};


export default function DiseaseDetection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('idle');
   // idle, uploading, analyzing, result
  const [result, setResult] = useState(null);
  const inputRef = useRef();

  function onSelect(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    setStatus('uploading');
    setFile(f);
    const url = URL.createObjectURL(f);
    setPreview(url);
    setTimeout(() => setStatus('idle'), 600);
  }

  function removeImage() {
    setFile(null);
    setPreview(null);
    setResult(null);
    setStatus('idle');
    inputRef.current.value = '';
  }

  function analyze() {
    if (!file) return;
    setStatus('analyzing');
    setResult(null);
    setTimeout(() => {
      setResult(SAMPLE);
      setStatus('result');
    }, 1400);
  }

  return (
    <div className="space-y-6">
      <section className="card">
        <h2 className="text-xl font-semibold">AI Crop Disease Detection</h2>
        <p className="muted mt-1">Upload a clear photo of your crop leaf to identify possible issues.</p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <label className="block">
              <div className={`border-2 border-dashed rounded-lg p-8 text-center ${preview ? 'bg-white' : 'bg-agri-cream'}`}>
                {!preview ? (
                  <div>
                    <div className="text-2xl">📷</div>
                    <div className="mt-2 font-medium">Upload Plant Image</div>
                    <div className="muted mt-1">Drag & drop an image here or browse from your device</div>
                    <div className="muted text-xs mt-2">Supported: JPG, PNG</div>
                    <div className="mt-4">
                      <input ref={inputRef} onChange={onSelect} accept="image/*" type="file" className="hidden" />
                      <button onClick={() => inputRef.current.click()} className="btn-primary">Browse</button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <img src={preview} alt="preview" className="w-full max-h-64 object-contain rounded" />
                    <div className="flex gap-3">
                      <button onClick={analyze} className="btn-primary">Analyze Crop</button>
                      <button onClick={removeImage} className="px-4 py-2 rounded-lg bg-white shadow">Remove Image</button>
                    </div>
                    <div className="text-xs muted">Tip: Use a clear photo of a single leaf on a plain background.</div>
                  </div>
                )}
              </div>
            </label>
          </div>

          <aside className="space-y-3">
            <div className="p-4 bg-white rounded shadow-sm">
              <div className="text-sm font-medium">AI States</div>
              <div className="text-xs muted mt-2">Uploading → Analyzing → Result</div>
              <div className="mt-3">
                <div className="text-sm">Status: <strong>{status}</strong></div>
              </div>
            </div>

            <div className="p-4 bg-white rounded shadow-sm">
              <div className="text-sm font-medium">Sample Image</div>
              <div className="muted text-xs mt-2">Use the sample to demo the analysis.</div>
              <div className="mt-3">
                <button onClick={() => {
                  // load a small placeholder sample by creating a blob from placeholder SVG
                  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='#fff8ef'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#0f5132' font-size='24'>Sample Leaf</text></svg>`;
                  const blob = new Blob([svg], { type: 'image/svg+xml' });
                  const f = new File([blob], 'sample.svg', { type: 'image/svg+xml' });
                  const ev = { target: { files: [f] } };
                  onSelect(ev);
                }} className="px-3 py-1 rounded-md bg-agri-fresh text-white">Load Sample</button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {status === 'analyzing' && (
        <section className="card">
          <div className="flex items-center gap-4">
            <div className="animate-pulse text-agri-deep">Analyzing image — please wait...</div>
          </div>
        </section>
      )}

      {status === 'result' && result && (
        <section className="card">
          <h3 className="text-lg font-semibold">Analysis Result</h3>
          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <div className="text-sm muted">Crop</div>
              <div className="text-lg font-bold">{result.crop}</div>

              <div className="mt-3 text-sm muted">Possible Issue</div>
              <div className="text-lg font-semibold">{result.issue}</div>

              <div className="mt-3 text-sm muted">Confidence</div>
              <div className="text-lg font-bold">{result.confidence}%</div>

              <div className="mt-4">
                <div className="text-sm font-medium">Symptoms</div>
                <ul className="list-disc list-inside mt-2 text-sm">
                  {result.symptoms.map((s) => (<li key={s}>{s}</li>))}
                </ul>
              </div>
            </div>

            <div>
              <div className="text-sm font-medium">Risk Level</div>
              <div className="mt-1 text-lg font-semibold">{result.risk}</div>

              <div className="mt-4">
                <div className="text-sm font-medium">Recommended Next Steps</div>
                <ol className="list-decimal list-inside mt-2 text-sm">
                  {result.steps.map((s) => (<li key={s}>{s}</li>))}
                </ol>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-yellow-50 rounded">
            <div className="text-sm">Disclaimer: This AI result is for informational guidance and does not replace professional agricultural advice.</div>
            <div className="mt-3">
              <button onClick={() => { setStatus('idle'); setResult(null); }} className="px-3 py-1 rounded-md bg-white">Analyze Another Image</button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

