// src/App.js
import { useState } from "react";
import "./App.css";

import Table from "./components/Table.js";
import Search from "./components/Search.js";
import PageSize from "./components/PageSize.js";
import Pagination from "./components/Pagination.js";
import ContinentFilter from "./components/ContinentFilter.js";
import { useCountriesQuery } from "./hooks/useCountriesQuery";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [continents, setContinents] = useState([]);
  const [order, setOrder] = useState("");

  // HENT DATA via hook (erstatter hele useEffect-delen din)
  const { data, loading, error } = useCountriesQuery({
    page: pageNumber, 
    pageSize, 
    search: searchQuery, 
    continents, 
    order //utvide med sortering
  });

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPageNumber(1); //start på side 1 ved nutt søk

  };

  return (
    <div className="App">
      <h1>Country lookup</h1>
      <Search onSearch={handleSearch}/>
      <Table 
        rows={data.results} 
        loading={loading} 
        error={error} 
      />
    </div>
  );
}
