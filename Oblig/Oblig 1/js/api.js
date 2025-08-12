// population.io (kan være ustabilt)
const POP_BASE = "https://d6wn6bmjj722w.population.io/1.0";

export async function fetchTodayAndTomorrow(name) {
  const url = `${POP_BASE}/population/${encodeURIComponent(name)}/today-and-tomorrow/`;
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) return { today: null, tomorrow: null };
  const data = await res.json();
  const arr = data?.total_population || [];
  return {
    today: arr[0]?.population ?? null,
    tomorrow: arr[1]?.population ?? null,
  };
}

export function calcRatePerSec(today, tomorrow) {
  if (today == null || tomorrow == null) return null;
  return (tomorrow - today) / (24 * 60 * 60);
}
