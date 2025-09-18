// src/hooks/useCountrySearch.js
import { useEffect, useState } from "react";
import { buildSearchParametersURL } from "../data/urlParameterBuilder";

/* DATASTRUKTUR PÅ API-SPØRRING
{
  "pager": {"page": 1, "pageCount": 1, "pageSize": 10, "total": 6},
  "results": [{}]
}
*/
export function useCountrySearch(page, pageSize, search, continents, order) {
  const [searchResults, setSearchResults] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // async funksjon for å hente data fra API
    async function searchCountries() {
      setLoading(true);   // viser at vi laster
      setError("");       // nullstill error hver gang vi søker på nytt

      try {
        // Forsøker å bygge ULR med aktuelle søkeparametere til API spørring
        const url = buildSearchParametersURL(page, pageSize, search, continents, order);
        const res = await fetch(url);   // fetcher fra API fra url bygget etter søkeparametere

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);  // kast error hvis HTTP-status ikke er OK
        }

        const json = await res.json();                // parser JSON fra API
        setSearchResults(json.results ?? []);         // oppdater søkeresultatene med tom array som fallback
        setPageCount(json.pager?.pageCount ?? 1);     // oppdater antall sider fra pager-objektet
      } 

      catch (err) {
        setError(err.message); // oppdater state for error ved feil
      } 

      finally {
        setLoading(false); // oppdaterer loading til false til slutt.
      }
    }

    searchCountries(); // kjør søk når dependency-arrayen endrer seg

  }, [page, pageSize, search, continents, order]);    // dependency array for useEffect()

  return [ searchResults, pageCount, loading, error ]; 
}
