// src/components/WeatherIcon.jsx
import { getWeatherIconUrl } from '../utils/getWeatherIconFileName';

export default function WeatherIcon({ symbol, size = 24 }) {
  if (!symbol) return null;

  const src = getWeatherIconUrl(symbol);
  const fallback = `${import.meta.env.BASE_URL || '/'}met-icons/200/01d.png`; // evt. egen unknown.png

  return (
    <img
      src={src}
      onError={(e) => { e.currentTarget.src = fallback; }}
      alt={symbol}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      style={{ display: 'inline-block' }}
    />
  );
}
