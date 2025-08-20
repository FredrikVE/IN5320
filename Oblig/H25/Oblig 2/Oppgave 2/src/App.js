import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./Table.js";
import Search from "./Search.js";
import PageSize from "./PageSize.js";
import Pagination from "./Pagination.js";

//import { size } from "mathjs";

function App() {
  /* Create state:
        - apiData: List containing dictionaries of countries from API.
        - searchQuery: The query parameter that should be added to &search=
        - pageNumber: The page that is requested
  */

  const [apiData, setApiData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Default = No search query
  const [pageNumber, setPageNumber] = useState(1); //Default = Page 1
  const [pageSize, setPageSize] = useState(10); // Default = 10 results per page


   // Callback som Search-komponenten kan bruke
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPageNumber(1); // Resett til første side når nytt søk gjøres
  };

  // del 3 handle pagesizechange
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPageNumber(1); //reset til første side når størrelse endres
  }

  //del 4 handlePageChange
  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };
 
  useEffect(() => {
    // All parameters are appended to this URL.
    //let apiQuery = "https://dhis2-app-course-api.ifi.uio.no/api?";
    let apiQuery = "https://dhis2-app-course.ifi.uio.no/api?";    //fjen -api fra url for å unngå kræsj   
    if (searchQuery) {  // If searchQuery isn't empty add &search=searchQuery to the API request.
      apiQuery = apiQuery + "&search=" + searchQuery;
    }

    //apiQuery = apiQuery + "&page=" + pageNumber;  // Add what page we are requesting to the API request.
    apiQuery = apiQuery + "&page=" + pageNumber + "&pageSize=" + pageSize;


    // Query data from API.
    console.log("Querying: " + apiQuery); 
    fetch(apiQuery)
      .then((results) => results.json())
      .then((data) => {
        // Then add response to state.
        setApiData(data);
      });
  }, [searchQuery, pageNumber, pageSize]); // Array containing which state changes that should re-reun useEffect()

  return (
    <div className="App">
      <h1>Country lookup</h1>
      <Search onSearch={handleSearch}/>
      <Table apiData={apiData} />
      <PageSize onPageSizeChange={handlePageSizeChange}/>
      <Pagination apiData={apiData} onPageChange={handlePageChange}/>
    </div>
  );
}

export default App;
