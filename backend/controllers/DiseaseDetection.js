import { useState } from 'react';
import { Upload, Camera, Leaf, AlertCircle, CheckCircle } from 'lucide-react';

export default function DiseaseDetection() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);

  function handleImage(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  }

  function analyzePlant() {
    if (!image) return;

    setAnalyzing(true);
    setResult(null);

    // Demo AI analysis
    setTimeout(() => {
      setResult({
        plant: 'Tomato',
        disease: 'Early Blight',
        confidence: 91,
        severity: 'Moderate',
        recommendation:
          'Remove affected leaves, avoid watering the leaves directly and maintain proper spacing between plants.',
      });

      setAnalyzing(false);
    }, 1800);
  }

  function resetAnalysis() {
    setImage(null);
    setPreview(null);
    setResult(null);
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          🌱 Crop Health Detection
        </h1>

        <p className="muted mt-1">
          Upload a plant image and detect possible crop diseases.
        </p>
      </div>

      {/* Upload Card */}
      <div className="card">

        {!preview ? (
          <label className="border-2 border-dashed border-slate-300 rounded-xl p-10 flex flex-col items-center justify-center cursor-pointer hover:border-green-600 transition">

            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-green-700" />
            </div>

            <h2 className="text-lg font-semibold">
              Upload Plant Image
            </h2>

            <p className="text-sm text-slate-500 mt-2 text-center">
              Take a clear photo of the affected leaf or plant.
            </p>

            <div className="mt-5 btn-primary">
              <Upload className="w-4 h-4" />
              Choose Image
            </div>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>
        ) : (
          <div>

            {/* Image Preview */}
            <div className="flex flex-col md:flex-row gap-6">

              <div className="md:w-1/2">
                <img
                  src={preview}
                  alt="Uploaded plant"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>

              {/* Analysis */}
              <div className="flex-1 flex flex-col justify-center">

                <div className="flex items-center gap-2 mb-3">
                  <Leaf className="text-green-700" />
                  <h2 className="text-xl font-semibold">
                    Ready for Analysis
                  </h2>
                </div>

                <p className="text-slate-500 mb-5">
                  Our AI will analyze the uploaded plant image for possible
                  diseases.
                </p>

                <div className="flex gap-3">

                  <button
                    onClick={analyzePlant}
                    disabled={analyzing}
                    className="btn-primary"
                  >
                    {analyzing ? 'Analyzing...' : '🔍 Analyze Plant'}
                  </button>

                  <button
                    onClick={resetAnalysis}
                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200"
                  >
                    Remove
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}
      </div>

      {/* Loading */}
      {analyzing && (
        <div className="card">
          <div className="flex items-center gap-3">

            <div className="w-6 h-6 border-2 border-green-700 border-t-transparent rounded-full animate-spin" />

            <div>
              <p className="font-semibold">
                Analyzing plant...
              </p>

              <p className="text-sm text-slate-500">
                AI is checking the image for possible diseases.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* Result */}
      {result && !analyzing && (
        <div className="card">

          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="text-green-600" />

            <h2 className="text-xl font-semibold">
              Analysis Result
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">

            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">
                Plant
              </p>

              <p className="text-lg font-semibold mt-1">
                🌱 {result.plant}
              </p>
            </div>

            <div className="bg-red-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">
                Possible Disease
              </p>

              <p className="text-lg font-semibold mt-1">
                ⚠️ {result.disease}
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-slate-500">
                AI Confidence
              </p>

              <p className="text-lg font-semibold mt-1">
                {result.confidence}%
              </p>
            </div>

          </div>

          {/* Severity */}
          <div className="flex items-start gap-3 bg-yellow-50 rounded-lg p-4 mb-4">

            <AlertCircle className="text-yellow-600 mt-1" />

            <div>
              <p className="font-semibold">
                Severity: {result.severity}
              </p>

              <p className="text-sm text-slate-600 mt-1">
                Early action can help prevent the disease from spreading.
              </p>
            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-green-50 rounded-lg p-5">

            <h3 className="font-semibold text-green-900 mb-2">
              💡 Recommended Action
            </h3>

            <p className="text-green-800">
              {result.recommendation}
            </p>

          </div>

        </div>
      )}

    </div>
  );
}