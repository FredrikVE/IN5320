// src/App.js
import { useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [order, toggleSort] = useSort("Country", "ASC");               //Standardsortering er alfabetisk sortering av land
  const [continents, toggleContinent] = useContinentFilter();
  const [searchResults, pageCount, loading, error] = useCountrySearch(       // Søk henter data fra API.
    currentPage, pageSize, search, continents, `${order.columnName}:${order.sortingDirection}`
  );

  return (
    <div className="App">
      <h1 className="app-title">World Population by Country</h1>
      <p className="app-subtitle">
        Search countries, filter by continent, and sort by clicking the column headers.
      </p>

      <SearchBar
        onSearch={(query) => {
          setSearch(query);
          setCurrentPage(1); // reset side ved nytt søk
        }}
      />

      <ContinentFilter
        selected={continents}
        onToggle={(name) => {
          toggleContinent(name);
          setCurrentPage(1); // reset side ved filter
        }}
      />

      <Table
        rows={searchResults ?? []}
        loading={loading}
        error={error}
        order={order}
        onSort={(key) => {
          toggleSort(key);
          setCurrentPage(1); // reset side ved sort
        }}
      />

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}
        onNext={() => setCurrentPage((p) => p + 1)}
      />

      <PageSize
        value={pageSize}
        onChange={(n) => {
          setPageSize(n);
          setCurrentPage(1); // tilbake til side 1
        }}
      />
    </div>
  );
}
