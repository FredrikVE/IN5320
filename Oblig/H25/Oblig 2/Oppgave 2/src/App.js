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

  // State variabler og settefunksjoner med tilhørende hooks
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);            
  const [columnName, sortingDirection, toggleSort] = useSort("Country", "ASC") //Standardsortering er alfabetisk sortering av land
  const [continents, toggleContinent] = useContinentFilter();
  const [searchResults, pageCount, loading, error] = useCountrySearch(       // Søk henter data fra API.
    currentPage, pageSize, search, continents, `${columnName}:${sortingDirection}` //den siste er en streng på formen "Population:DESC"
  );

  // Returnerer komponentene på siden
  return (
    <div className="App">
      <h1 className="app-title">World Population by Country</h1>
      <p className="app-subtitle">
        Search countries, filter by continent, and sort by clicking the column headers.
      </p>

      <SearchBar
        onSearch={(query) => {
          setSearch(query);
          setCurrentPage(1); // resetter til første side ved nytt søk
        }}
      />

      <ContinentFilter
        selected={continents}
        onToggle={(name) => {
          toggleContinent(name);
          setCurrentPage(1); // resetter til side 1 ved bruk av kontinentfilter
        }}
      />

      <Table
        rows={searchResults ?? []}
        loading={loading}
        error={error}
        order={{columnName, sortingDirection}}
        onSort={(key) => {
          toggleSort(key);
          setCurrentPage(1); // tilbakestiller til side 1 side ved sortering av kolonne
        }}
      />

      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        onPrev={() => setCurrentPage((p) => Math.max(1, p - 1))}  // previous knapp går til den som er størst av 1 og p-1
        onNext={() => setCurrentPage((p) => p + 1)}               // next knapp øker p med 1 slik at man går en side frem
      />

      <PageSize
        value={pageSize}
        onChange={(n) => {
          setPageSize(n);           // oppdaterer pageSize
          setCurrentPage(1);        // tilbakestiller til side 1
        }}
      />
    </div>
  );
}
