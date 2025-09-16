//src/components/Pagination.js
export default function Pagination({ pager, onPrev, onNext }) {
  if (!pager) return null;                        // Ingen pager enda ⇒ ikke render noe

  const { currentPage, pageCount } = pager;       // Nåværende side og totalt antall sider

  return (
    <nav className="pagination">
      {/* Vis bare "Previous" når vi ikke er på første side */}
      {currentPage > 1 && (
        <button className="pagination-btn" onClick={onPrev}>
          &lsaquo; Previous
        </button>
      )}

      {/* viser hvilken side bruker er på av totalt antall sider */}
      <span>Page {currentPage} of {pageCount}</span>

      {/* Vis kun "Next" når det faktisk er en neste side. */}
      {currentPage < pageCount && (
        <button className="pagination-btn" onClick={onNext}>
           Next &rsaquo;
        </button>
      )}
    </nav>
  );
}

//NB! &rsaquo; og &lsaquo; er høyre og venstre-pil-ikon inne i next- og previousknappene
