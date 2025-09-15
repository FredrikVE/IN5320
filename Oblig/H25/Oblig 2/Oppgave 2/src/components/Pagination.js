//src/components/Pagination.js
export default function Pagination({ pager, onPrev, onNext }) {
  if (!pager) return null;                        // Ingen pager enda ⇒ ikke render noe

  const { page, pageCount } = pager;              // Nåværende side og totalt antall sider

  return (
    <nav className="pagination">
      {/* Vis bare "Previous" når vi ikke er på første side */}
      {page > 1 && (
        <button className="pagination-btn" onClick={onPrev} aria-label="Previous page">
          <span aria-hidden="true">&lsaquo;</span> Previous
        </button>
      )}

      {/* Melding som viser hvilken side som vises (f.eks. "Page 1 of 22") */}
      <span>Page {page} of {pageCount}</span>

      {/* Vis kun "Next" når vi ikke er på siste side */}
      {page < pageCount && (
        <button className="pagination-btn" onClick={onNext} aria-label="Next page">
          Next <span aria-hidden="true">&rsaquo;</span>
        </button>
      )}
    </nav>
  );
}

//NB! &rsaquo; og &lsaquo; er høyre og venstre-pil-ikon inne i next- og previousknappene