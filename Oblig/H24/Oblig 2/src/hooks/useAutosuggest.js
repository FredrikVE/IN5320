//src/hooks/useAutosuggest.js
import { useEffect, useState } from "react";
import { fetchAllCountryNames } from "../data/countriesApi";

export function useAutosuggest() {
  const [allNames, setAllNames] = useState([]);
  useEffect(() => {
    let alive = true;
    fetchAllCountryNames().then(n => alive && setAllNames(n)).catch(() => {});
    return () => { alive = false; };
  }, []);

  function suggest(q, limit = 10) {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return allNames.filter(n => n.toLowerCase().includes(s)).slice(0, limit);
  }

  return { suggest };
}
