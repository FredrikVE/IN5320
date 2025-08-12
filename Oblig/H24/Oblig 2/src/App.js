//src/App.js
import { useMemo, useState } from "react";
import { useCountriesQuery } from "./hooks/useCountriesQuery";
import { useAutosuggest } from "./hooks/useAutosuggest";

import SearchBar from "./components/SearchBar";
import { ContinentFilters } from "./components/ContinentFilters";
import { PageSize } from "./components/PageSize";
import { SortSelect } from "./components/SortSelect";
import { Pagination } from "./components/Pagination";
import Table from "./components/Table";
import "./ui/styles/index.css";

export default function App() {
  
  // query params
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [order, setOrder] = useState("");
  const [continents, setContinents] = useState([]);

  // search draft + autosuggest
  const [searchDraft, setSearchDraft] = useState("");
  const { suggest } = useAutosuggest();
  const suggestions = useMemo(() => suggest(searchDraft), [suggest, searchDraft]);

  // data
  const { data, loading, error } = useCountriesQuery({
    page, pageSize, search: searchQuery, order, continents
  });

  // handlers
  const onSearchSubmit = () => {
    setSearchQuery(searchDraft.trim());
    setPage(1);
    setSearchDraft("");
  };
  const onChooseSuggestion = (name) => {
    setSearchQuery(name);
    setSearchDraft("");
    setPage(1);
  };
  const toggleContinent = (c) => {
    setPage(1);
    setContinents((prev) => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  };
  const resetFilters = () => {
    setSearchQuery("");
    setSearchDraft("");
    setContinents([]);
    setOrder("");
    setPage(1);
  };

  const showReset = !!searchQuery || continents.length > 0 || !!order;

  return (
    <div className="wrap">
      <h1>Country Search</h1>

      <SearchBar
        valueDraft={searchDraft}
        onChangeDraft={(v) => { setSearchDraft(v); }}
        onSubmit={onSearchSubmit}
        suggestions={suggestions}
        onChooseSuggestion={onChooseSuggestion}
        showReset={showReset}
        onReset={resetFilters}
      />

      <ContinentFilters selected={continents} onToggle={toggleContinent} />

      <div className="row gap small">
        <PageSize value={pageSize} onChange={(n) => { setPageSize(n); setPage(1); }} />
        <SortSelect value={order} onChange={(val) => { setOrder(val); setPage(1); }} />
      </div>

      <Table rows={data.results} loading={loading} error={error} />

      <Pagination
        pager={data.pager}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />
    </div>
  );
}
