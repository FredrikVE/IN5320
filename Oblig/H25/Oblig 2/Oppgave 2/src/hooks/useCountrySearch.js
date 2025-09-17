/* DATASTRUKTUR PÅ API-SPØRRING

{
  "pager": {"page": 1, "pageCount": 1, "pageSize": 10, "total": 6},
  "results": [{}]
}

*/

// src/hooks/useCountrySearch.js
import { useEffect, useState } from "react";
import { buildSearchParametersURL } from "../data/urlParameterBuilder";

export function useCountrySearch({ page, pageSize, search, continents, order }) {
  const [searchResults, setSearchResults] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
  
    async function searchCountries() {
      setLoading(true);
      setError("");

      try {
        const url = buildSearchParametersURL({ page, pageSize, search, continents, order });
        const res = await fetch(url, { signal });

        if (!res.ok) { 
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();        //definer JSON objekt med pagecount
        
        setSearchResults(json.results ?? []); // Oppdaterer state for søkeresultater fra API-spørring. Legger inn tom liste hvis søk feiler.
        setPageCount(json.pager?.pageCount ?? 1); // Trekker kun ut så mange sider som pagecount bestemmer
      } 
      
      catch (err) {
        if (!signal.aborted) setError(err.message || "Fetch error");
      } 
      
      finally {
        if (!signal.aborted) setLoading(false);
      }
    }

    searchCountries();

    // Cleanup-funksjon
    return () => controller.abort();

  }, [page, pageSize, search, continents, order]);    //dependancy array for useEffect()

  return { searchResults, pageCount, loading, error };  // returner literal-objekt med resultater
}
