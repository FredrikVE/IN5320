// src/App.js
import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import PageSize from "./components/PageSize";
import Pagination from "./components/Pagination"
import { useCountrySearch } from "./hooks/useCountrySearch";
import SortSelect from "./components/SortSelect";

export default function App() {
  // Statevariabler
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [continents, setContinents] = useState([]);
  const [order, setOrder] = useState("");

  // Søkeparametere
  const params = { page, pageSize, search, continents, order };

  // Henter {data, loading, error} med cutom-hooken som trigges når 'params' endres
  const { data, loading, error } = useCountrySearch(params);

  return (
    <div className="App">
      <h1>Country lookup</h1>
      <SearchBar onSearch={(query) => { setSearch(query); setPage(1); }} />
      <SortSelect 
        value={order}
        onChange={(val) => {setOrder(val); setPage(1); }}
      />
      <Table rows={data.results} loading={loading} error={error} />

      <Pagination
        pager={data.pager}
        onPrev={() => setPage(p => Math.max(1, p - 1))}
        onNext={() => setPage(p => p + 1)}
      />
      
       <PageSize
        value={pageSize}
        onChange={(n) => { setPageSize(n); setPage(1); }} // endre antall per side → tilbake til side 1
      />

    </div>
  );
}
