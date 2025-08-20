// src/App.js
import { useState } from "react";
import "./App.css";
import Table from "./Table.js";
import Search from "./Search.js";
import PageSize from "./PageSize.js";
import Pagination from "./Pagination.js";
import ContinentFilter from "./ContinentFilter.js";
import { useCountriesQuery } from "./hooks/useCountriesQuery";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [continents, setContinents] = useState([]);
  const [order, setOrder] = useState("");

  // HENT DATA via hook (erstatter hele useEffect-delen din)
  const { data: apiData, loading, error } = useCountriesQuery({
    page: pageNumber,
    pageSize,
    search: searchQuery,
    continents,
    order //utvide med sortering
  });


  // Callback som Search-komponenten kan bruke
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPageNumber(1);
  };

  // del 3 handle pagesizechange
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPageNumber(1);
  };

  // del 4 handlePageChange
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  // del 6 (optional)
  const handleToggleContinent = (name) => {
    setContinents((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
    setPageNumber(1);
  };

  return (
    <div className="App">
      <h1>Country lookup</h1>
      <Search onSearch={handleSearch}/>
      <ContinentFilter selected={continents} onToggle={handleToggleContinent} />
      <PageSize onPageSizeChange={handlePageSizeChange}/>
      {/* Du kan la Table bruke loading/error, eller beholde som før */}
      <Table 
      apiData={apiData} 
      loading={loading} 
      error={error} 
      sortOrder={order}
      onSort={(val) => {
        setOrder(val);
        setPageNumber(1); //start alltid på side 1 når sortering endres

      }}
      />
      <Pagination apiData={apiData} onPageChange={handlePageChange}/>
    </div>
  );
}

export default App;
