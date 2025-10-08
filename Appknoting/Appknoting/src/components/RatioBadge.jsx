export default function RatioBadge({ value, target, invert=false }) {
  if (value == null || target == null) return null;
  const ok = invert ? value >= target : value <= target;
  const diff = invert ? (value - target) : (target - value);
  const label = ok ? "✅ Oppfyller" : "⚠️ Avvik";
  return <div style={{opacity:.8, fontSize:12}}>{label} (diff {diff.toFixed(2)})</div>;
}
