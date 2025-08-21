// src/hooks/useCountriesQuery.js
import { useEffect, useState } from "react";
import { buildSearchParametersURL } from "../data/urlParameterBuilder";

// Lager en "customhook" som henter data om land fra API basert på søkeparametere
export function useCountrySearch({ page, pageSize, search, continents, order }) {
  
  const [data, setData] = useState({ pager: null, results: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Kjør ny henting hver gang input-parametrene endrer seg
  useEffect(() => {
    const controller = new AbortController();  // AbortController lar oss avbryte fetch ved param-endring eller når komponenten fjernes fra DOM
    const { signal } = controller;

    // Navngitt async-funksjon for å kunne bruke await inne i effekten
    async function searchCountries() {
      setLoading(true);
      setError("");

      try {
        const url = buildSearchParametersURL({ page, pageSize, search, continents, order }); // Lag URL med aktuelle kombinasjoner av av søkeparametere
        const res = await fetch(url, { signal });  // Gjør HTTP-kall og send avbrytingssignal
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`); // Kast eventuell HTTP-feil inn i catch-blokken
        
        const json = await res.json();   // Parse JSON-responsen fra API-et
        setData({ pager: json.pager, results: json.results ?? [] });   // Oppdater data i state (fallback til tom array hvis results mangler)
      } 
      
      catch (err) {
        if (signal.aborted) return; // Hvis kallet ble avbrutt, gjør ingenting
        setError(err.message || "Fetch error");  // Ellers: lagre feilmeldingen så UI kan vise den
      } 
      
      finally {
        if (!signal.aborted) setLoading(false); // Slå av "Loading…", men ikke hvis kallet ble avbrutt
      }
    }

    searchCountries(); // utfør søk og hent land.

    
    return () => controller.abort(); // Cleanup ved å avbryte pågående fetch hvis parametere endres eller ved fjerning
  }, [page, pageSize, search, continents, order]);  // Avhengigheter: når noen av disse endrer seg, kjøres effekten på nytt

  return { data, loading, error };  // returner hookens states til de komponentene som bruker den
}
