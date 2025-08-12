//src/hooks/useCountriesQuery.js
import { useEffect, useMemo, useState } from "react";
import { buildCountriesUrl } from "../data/countriesApi";

export function useCountriesQuery({ page, pageSize, search, order, continents }) {
  const [state, setState] = useState({ data: { pager: null, results: [] }, loading: false, error: "" });

  const url = useMemo(
    () => buildCountriesUrl({ page, pageSize, search, order, continents }),
    [page, pageSize, search, order, continents]
  );

  useEffect(() => {
    let alive = true;
    setState(s => ({ ...s, loading: true, error: "" }));
    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then(json => alive && setState({
        data: { pager: json.pager, results: json.results ?? [] }, 
        loading: false, error: "" }
      ))

      .catch(err => alive && setState({
        data: { pager: null, results: [] }, 
        loading: false, error: err.message || "Fetch error" }
      ));

    return () => { alive = false; };
  }, 
  [url]);

  return state; // { data, loading, error }
}
