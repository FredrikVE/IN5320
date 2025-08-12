import { useEffect, useMemo, useState } from "react";
import Table from "./Table";
import "./index.css";

const API_BASE = "https://dhis2-app-course.ifi.uio.no/api";

export default function App() {
  // ---- API params i state ----
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");   
  const [order, setOrder] = useState("");               
  const [continents, setContinents] = useState([]);     

  // ---- Autosuggest ----
  const [searchDraft, setSearchDraft] = useState("");   
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1); 
  const [allCountries, setAllCountries] = useState([]);     

  // ---- API-respons ----
  const [data, setData] = useState({ pager: null, results: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Hent alle land én gang for autosuggest
  useEffect(() => {
    let alive = true;
    fetch(`${API_BASE}?paging=false&order=Country:ASC`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((j) => {
        if (!alive) return;
        const names = (j.results || []).map((r) => r.Country).filter(Boolean);
        setAllCountries(names);
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  // Bygg URL
  const url = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", page);
    params.set("pageSize", pageSize);
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (order) params.set("order", order);
    if (continents.length > 0) params.set("Continent", continents.join(","));
    return `${API_BASE}?${params.toString()}`;
  }, [page, pageSize, searchQuery, order, continents]);

  // Hent tabell-data
  useEffect(() => {
    let alive = true;
    setLoading(true);
    setError("");
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((json) => {
        if (!alive) return;
        setData({ pager: json.pager, results: json.results ?? [] });
      })
      .catch((e) => { if (alive) setError(e.message || "Fetch error"); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [url]);

  // Autosuggest-filter
  useEffect(() => {
    const q = searchDraft.trim().toLowerCase();
    if (!q) { setSuggestions([]); return; }
    const t = setTimeout(() => {
      const hits = allCountries
        .filter((name) => name.toLowerCase().includes(q))
        .slice(0, 10);
      setSuggestions(hits);
      setHighlightIndex(-1);
    }, 150);
    return () => clearTimeout(t);
  }, [searchDraft, allCountries]);

  // Handlers
  function onSearchSubmit(e) {
    e.preventDefault();
    setSearchQuery(searchDraft.trim());
    setPage(1);
    setShowSuggest(false);
    setSearchDraft(""); 
  }

  function toggleContinent(c) {
    setPage(1);
    setContinents((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]
    );
  }

  function chooseSuggestion(name) {
    setSearchQuery(name);   
    setSearchDraft("");     
    setPage(1);
    setShowSuggest(false);
    setHighlightIndex(-1);
  }

  function resetFilters() {
    setSearchQuery("");
    setSearchDraft("");
    setContinents([]);
    setOrder("");
    setPage(1);
  }

  // Pagination-knapper
  const canPrev = data.pager?.page > 1;
  const canNext = data.pager && data.pager.page < data.pager.pageCount;

  // Skal vi vise "Tilbake"-knappen?
  const showReset = searchQuery || continents.length > 0 || order;

  return (
    <div className="wrap">
      <h1>Country Search</h1>

      {/* Search + autosuggest */}
      <form className="row gap" onSubmit={onSearchSubmit}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <input
            aria-label="Search"
            placeholder="Search"
            value={searchDraft}
            onChange={(e) => { 
              setSearchDraft(e.target.value); 
              setShowSuggest(true); 
            }}
            onKeyDown={(e) => {
              if (!showSuggest || suggestions.length === 0) return;
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setHighlightIndex((prev) => (prev + 1) % suggestions.length);
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setHighlightIndex((prev) =>
                  prev <= 0 ? suggestions.length - 1 : prev - 1
                );
              } else if (e.key === "Enter") {
                if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
                  e.preventDefault();
                  chooseSuggestion(suggestions[highlightIndex]);
                }
              } else if (e.key === "Escape") {
                setShowSuggest(false);
              }
            }}
          />
          <button type="submit">Search</button>

          {showSuggest && suggestions.length > 0 && (
            <ul className="suggest">
              {suggestions.map((name, idx) => (
                <li key={name}>
                  <button
                    type="button"
                    className={idx === highlightIndex ? "active" : ""}
                    onMouseEnter={() => setHighlightIndex(idx)}
                    onClick={() => chooseSuggestion(name)}
                  >
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        {showReset && (
          <button type="button" onClick={resetFilters} style={{ background: "#aaa", borderColor: "#aaa" }}>
            Tilbake
          </button>
        )}
      </form>

      {/* Continents */}
      <div className="row gap small">
        {["Europe", "Africa", "South America", "North America", "Oceania", "Asia"].map(
          (c) => (
            <label key={c}>
              <input
                type="checkbox"
                checked={continents.includes(c)}
                onChange={() => toggleContinent(c)}
              />
              {c}
            </label>
          )
        )}
      </div>

      {/* Per-side + sort */}
      <div className="row gap small">
        <label>
          Results per page:{" "}
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {[10, 20, 50].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </label>

        <label>
          Sort:
          <select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
              setPage(1);
            }}
          >
            <option value="">(none)</option>
            <option value="Country:ASC">Country ↑</option>
            <option value="Country:DESC">Country ↓</option>
            <option value="Population:ASC">Population ↑</option>
            <option value="Population:DESC">Population ↓</option>
            <option value="PopulationGrowth:ASC">Growth ↑</option>
            <option value="PopulationGrowth:DESC">Growth ↓</option>
          </select>
        </label>
      </div>

      {/* Tabell */}
      <Table rows={data.results} loading={loading} error={error} />

      {/* Pagination */}
      {data.pager && (
        <div className="row gap center">
          <button disabled={!canPrev} onClick={() => canPrev && setPage(page - 1)}>
            ◀ Prev
          </button>
          <span>
            Page {data.pager.page} of {data.pager.pageCount}
          </span>
          <button disabled={!canNext} onClick={() => canNext && setPage(page + 1)}>
            Next ▶
          </button>
        </div>
      )}
    </div>
  );
}
