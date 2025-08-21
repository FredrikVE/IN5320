import { useState } from "react";
import Table from "./components/Table";
import SearchBar from "./components/SearchBar";
import PageSize from "./components/PageSize";
import Pagination from "./components/Pagination"
import { useCountrySearch } from "./hooks/useCountrySearch";
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


  // Toggle ett kontinent. Funksjonen sendes inn i ContnentFilter.js der name kommer inn i parameteret.
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
  
  function handleHeaderSort(key) {
    var nextDir = "ASC";
    if (order) {
      var parts = order.split(":");
      if (parts[0] === key && parts[1] === "ASC") {
        nextDir = "DESC";
      }
    }
    setOrder(key + ":" + nextDir);
    setPage(1);
  }

  return (
    //Definerer en app-div som container for css-styling
    <div className="App">
      <h1 className="app-title">World Population by Country</h1>
      <p className="app-subtitle">
        Search countries, filter by continent, and sort by clicking the column headers.
      </p>

      {/* SearchBar */}
      <SearchBar onSearch={(query) => { setSearch(query); setPage(1); }} />

      <div className="filters-row">
        {/* kontinentfilter */}
        <ContinentFilter
          selected={continents}
          onToggle={toggleContinent}
        />
      </div>

      {/* Tabell */}
      <Table 
        rows={data.results} 
        loading={loading} 
        error={error}
        onSort={handleHeaderSort}     //send handler for header-klikk
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
