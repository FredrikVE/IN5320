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
        console.log("json 1: ", json)

        /*
        const { 
          results = [], 
          pager: { pageCount = 1 } = {} 
        } = json;

        console.log("json 2: ", json)

        setSearchResults(results);
        setPageCount(pageCount); // Trekker kun ut så mange sider som pagecount bestemmer
        */

        setSearchResults(json.results ?? []); //Setter 
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
    return () => controller.abort();

  }, [page, pageSize, search, continents, order]); //dependancy array for useEffect()

  return { searchResults, pageCount, loading, error };
}
