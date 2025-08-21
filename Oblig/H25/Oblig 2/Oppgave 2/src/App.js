// src/App.js
import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import { useCountrySearch } from "./hooks/useCountrySearch";

export default function App() {
  // ÉN sannhet: UI-defaults bor her
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [continents, setContinents] = useState([]);
  const [order, setOrder] = useState("");

  const params = { page, pageSize, search, continents, order };

  // Henter {data, loading, error} fra hooken; fetch trigges når 'params' endres
  const { data, loading, error } = useCountrySearch(params);

  return (
    <div className="App">
      <h1>Country lookup</h1>
      <SearchBar onSearch={(query) => { setSearch(query); setPage(1); }} />
      <Table rows={data.results} loading={loading} error={error} />
    </div>
  );
}
