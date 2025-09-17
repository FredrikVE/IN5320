//src/components/Pagination.js
export default function Pagination({ pager, onPrev, onNext }) {
  if (!pager) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      {/* "previous" vises bare når pager ikke er på første side */}
      {/* Dette skjer når den nåværende siden er mer enn én */}
      {pager.currentPage > 1 && (
        <button className="pagination-btn" onClick={onPrev} type="button">
          &lsaquo; Previous
        </button>
      )}

      {/* Tekst mellom knappene som viser hvilken "page" brukeren er på. */}
      <span>Page {pager.currentPage} of {pager.pageCount}</span>

      {/* Viser bare "next" "Next" når det faktisk finnes en neste side */}
      {/* Dette skjer når den nåværende siden er mindre enn totalt antall pages */}
      {pager.currentPage < pager.pageCount && (
        <button className="pagination-btn" onClick={onNext} type="button">
          Next &rsaquo;
        </button>
      )}
    </nav>
  );
}
//NB! &rsaquo; og &lsaquo; er høyre og venstre-pil-ikon inne i next- og previousknappene
