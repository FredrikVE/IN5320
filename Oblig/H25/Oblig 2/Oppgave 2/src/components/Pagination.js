// src/Pagination.js

import React from "react";                 // Importerer React slik at vi kan skrive JSX.

function Pagination({ apiData, onPageChange }) { // Funksjonskomponent som får data fra API og en callback for å endre side.
  const pager = apiData?.pager;           // Hent ut "pager"-objektet fra responsen (?. = optional chaining i tilfelle apiData er undefined).
  if (!pager) return null;                // Guard: Hvis pager ikke finnes ennå (før fetch er ferdig), ikke render noe.

  const { page, pageCount } = pager;      // Destrukturer gjeldende side og totalt antall sider fra pager.

  return (
    <div>
      {page > 1 && (                      // Betinget rendering: Vis "Previous" kun når vi er etter side 1.
        <button onClick={() => onPageChange(page - 1)}>Previous</button> // Klikk kaller parent-callback med forrige side.
      )}

      <span> Page {page} of {pageCount} </span>

      {page < pageCount && (              // Betinget rendering: Vis "Next" kun når vi ikke er på siste side.
        <button onClick={() => onPageChange(page + 1)}>Next</button>     // Klikk kaller parent-callback med neste side.
      )}
    </div>
  );
}

export default Pagination;                // Eksporter komponenten så App.js kan bruke den.
