import { useState } from "react";
import "./App.css";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import PageSize from "./components/PageSize";
import Pagination from "./components/Pagination"
import { useCountrySearch } from "./hooks/useCountrySearch";
import SortSelect from "./components/SortSelect";
import ContinentFilter from "./components/ContinentFilter";

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


  // Toggle ett kontinent
  function toggleContinent(name) {
    setPage(1); // start på side 1 når filtre endres
    
    // Lag en kopi, finn index, legg til eller fjern
    var list = continents.slice();
    var i = list.indexOf(name);

    if (i === -1) {
      list.push(name);
    } 
    else {
      list.splice(i, 1);
    }
    setContinents(list);
  }

  return (
    <div className="App">
      <h1>Country lookup</h1>

      {/* SearchBar */}
      <SearchBar onSearch={(query) => { setSearch(query); setPage(1); }} />

      <ContinentFilter
        selected={continents}
        onToggle={toggleContinent}
      />

      {/* Sorteringsfelt */}
      <SortSelect 
        value={order}
        onChange={(val) => {
          setOrder(val); 
          setPage(1); 
        }}
      />

      {/* Tabell */}
      <Table rows={data.results} loading={loading} error={error} />

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
