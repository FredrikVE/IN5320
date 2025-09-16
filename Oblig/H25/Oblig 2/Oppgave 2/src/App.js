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
  // State for søk, paginering og side
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Hooks for sortering og filter
  const [order, toggleSort] = useSort("Country", "ASC");
  const [continents, toggleContinent] = useContinentFilter();

  // Bygg søkeparametere
  const params = { 
    page, 
    pageSize, 
    search, 
    continents, 
    order: `${order.columnName}:${order.sortingDirection}`
  };

  // Hent data fra API
  const { data, loading, error } = useCountrySearch(params);

  return (
    <div className="App">
      <h1 className="app-title">World Population by Country</h1>
      <p className="app-subtitle">
        Search countries, filter by continent, and sort by clicking the column headers.
      </p>

      {/* SearchBar */}
      <SearchBar onSearch={(query) => { setSearch(query); setPage(1); }} />

      <div className="filters-row">
        {/* Kontinentfilter */}
        <ContinentFilter
          selected={continents}
          onToggle={(name) => {
            toggleContinent(name);
            setPage(1); // reset side når filter endres
          }}
        />
      </div>

      {/* Tabell */}
      <Table 
        rows={data.results?? []} 
        loading={loading} 
        error={error}
        order={order}
        onSort={(key) => { 
          toggleSort(key); 
          setPage(1); 
        }}     
      />

      {/* Sidevelger med next og previousknapp */}
      <Pagination
        pager={data.pager}
        onPrev={() => setPage(page => Math.max(1, page - 1))}
        onNext={() => setPage(page => page + 1)}
      />

      {/* Dropdownmeny med antall elementer per side */}
      <PageSize
        value={pageSize}
        onChange={(n) => { 
          setPageSize(n); 
          setPage(1);   // tilbake til side 1
        }}
      />
    </div>
  );
}
