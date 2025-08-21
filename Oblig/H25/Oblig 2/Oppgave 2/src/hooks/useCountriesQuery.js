// src/hooks/useCountriesQuery.js
import { useEffect, useMemo, useState } from "react";              // React-hooks
import { buildCountriesUrl } from "../data/countriesApi";          // Lager API-URL ut fra parametere

// Custom hook som henter land-data fra API
export function useCountriesQuery({ page, pageSize, search, continents, order }) {

  // Statevariabler
  const [data, setData] = useState({ pager: null, results: [] });  // API-data (pager + resultater)
  const [loading, setLoading] = useState(false);                    // Lasteindikator
  const [error, setError] = useState("");                           // Evt. feilmelding

  // Bygg URL kun når input-parameterne endres (unngår unødige fetch-kall)
  const url = useMemo(() => buildCountriesUrl({ page, pageSize, search, continents, order }),
    [page, pageSize, search, continents, order]                     // Avhengigheter
  );

  // Hent data hver gang URL endres
  useEffect(() => {
    let ignore = false; // Beskytter mot state-oppdatering etter unmount
    setLoading(true);
    setError("");      // Nullstill gammel feil før ny henting

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);        // Løft HTTP-feil inn i .catch
        return res.json();                                         // Parse JSON-respons
      })
      .then((json) => {
        if (!ignore)                                               // Oppdater kun hvis komponenten fortsatt er “live”
          setData({ pager: json.pager, results: json.results ?? [] }); // Fallback til tom array hvis results mangler
      })
      .catch((err) => {
        if (!ignore) setError(err.message || "Fetch error");       // Lagre feilmelding i state
      })
      .finally(() => {
        if (!ignore) setLoading(false);                            // Slå av loading uansett utfall
      });

    return () => { 
      ignore = true; 
    };                               // Cleanup: markér som avbrutt ved unmount
  }, [url]);

  return { data, loading, error };                                  // Eksponer hookens state til forbruker
}
