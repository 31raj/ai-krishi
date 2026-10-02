export default function ProgressRing({ percent = 0, size = 80 }) {
  const stroke = 8;
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (percent / 100) * circ;

  return (
    <svg width={size} height={size} className="block">
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={radius} stroke="#e6e6e6" strokeWidth={stroke} fill="transparent" />
        <circle r={radius} stroke="#3fbf6f" strokeWidth={stroke} fill="transparent" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90)" />
        <text x="0" y="4" textAnchor="middle" fontSize="14" fontWeight="600">{percent}%</text>
      </g>
    </svg>
  );
}
