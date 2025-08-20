import React from "react";

function Pagination({ apiData, onPageChange }) {
  if (!apiData || !apiData.page || !apiData.totalPages) {
    return null; // Ikke vis noe før data er lastet
  }

  return (
    <div>
      {/* Forrige side knapp, vises kun hvis vi ikke er på side 1 */}
      {apiData.page > 1 && (
        <button onClick={() => onPageChange(apiData.page - 1)}>
          Previous
        </button>
      )}

      <span> Page {apiData.page} of {apiData.totalPages} </span>

      {/* Neste side knapp, vises kun hvis vi ikke er på siste side */}
      {apiData.page < apiData.totalPages && (
        <button onClick={() => onPageChange(apiData.page + 1)}>
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
