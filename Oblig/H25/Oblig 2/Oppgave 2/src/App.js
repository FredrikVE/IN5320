// src/App.js
import { useEffect, useState } from "react";   // ← bruk useEffect for å synke pageCount
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import PageSize from "./components/PageSize";
import Pagination from "./components/Pagination";
import { useCountrySearch } from "./hooks/useCountrySearch";
import ContinentFilter from "./components/ContinentFilter";
import useSort from "./hooks/useSort";
import useContinentFilter from "./hooks/useContinentFilter";

export default function App() {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);

  const [pager, setPager] = useState({ currentPage: 1, pageCount: 1 });
  const [order, toggleSort] = useSort("Country", "ASC");
  const [continents, toggleContinent] = useContinentFilter();

  // Bygg parametre ved å bruke pager.page
  const params = { 
    page: pager.currentPage,
    pageSize, 
    search, 
    continents, 
    order: `${order.columnName}:${order.sortingDirection}` //For eks Country:ASC eller Population:DESC
  };

  // Hent data og total antall sider
  const { searchResults, pageCount, loading, error } = useCountrySearch(params);

  // Synk pageCount fra hook og legg inn i pager-state
  useEffect(() => {
    setPager(prev => ({ ...prev, pageCount }));
  }, [pageCount]);

  return (
    <div className="App">
      <h1 className="app-title">World Population by Country</h1>
      <p className="app-subtitle">
        Search countries, filter by continent, and sort by clicking the column headers.
      </p>

      <SearchBar onSearch={(query) => { setSearch(query); setPager(p => ({...p, currentPage: 1})); }} />

      <div className="filters-row">
        <ContinentFilter
          selected={continents}
          onToggle={(name) => {
            toggleContinent(name);
            setPager(p => ({ ...p, currentPage: 1 })); // reset side ved filter
          }}
        />
      </div>

      <Table 
        rows={searchResults ?? []} 
        loading={loading} 
        error={error}
        order={order}
        onSort={(key) => { 
          toggleSort(key); 
          setPager(p => ({ ...p, currentPage: 1 })); // reset side ved sort
        }}     
      />

      <Pagination
        pager={pager} // ← gir hele pager-objektet
        onPrev={() => setPager(p => ({ ...p, currentPage: Math.max(1, p.currentPage - 1) }))}
        onNext={() => setPager(p => ({ ...p, currentPage: p.currentPage + 1 }))}
      />

      <PageSize
        value={pageSize}
        onChange={(n) => { 
          setPageSize(n); 
          setPager(p => ({ ...p, currentPage: 1 }));   // tilbake til side 1
        }}
      />
    </div>
  );
}
