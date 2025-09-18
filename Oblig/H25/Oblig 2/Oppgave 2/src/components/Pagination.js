// src/components/Pagination.js
export default function Pagination({ currentPage, pageCount, onPrev, onNext }) {
  if (!pageCount) return null; // ikke vis paginering hvis vi ikke har fått noe data fra API

  return (
    <nav className="pagination" aria-label="Pagination">
      {/* "previous"-knappen vises bare når vi ikke er på første side */}
      {/* Dette skjer når den nåværende siden er større enn 1 */}
      {currentPage > 1 && (
        <button className="pagination-btn" onClick={onPrev} type="button">
          &lsaquo; Previous
        </button>
      )}

      {/* Tekst mellom knappene som viser hvilken side brukeren er på */}
      <span>
        Page {currentPage} of {pageCount}
      </span>

      {/* "next"-knappen vises bare når det faktisk finnes en neste side */}
      {/* Dette skjer når den nåværende siden er mindre enn totalt antall sider */}
      {currentPage < pageCount && (
        <button className="pagination-btn" onClick={onNext} type="button">
          Next &rsaquo;
        </button>
      )}
    </nav>
  );
}

// NB! &rsaquo; og &lsaquo; er HTML-entities for høyre- og venstre-pil-ikon
// som brukes i next- og previous-knappene
