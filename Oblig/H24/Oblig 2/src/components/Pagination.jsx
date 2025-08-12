export function Pagination({ pager, onPrev, onNext }) {
  if (!pager) return null;
  const canPrev = pager.page > 1;
  const canNext = pager.page < pager.pageCount;
  return (
    <div className="row gap center">
      <button disabled={!canPrev} onClick={onPrev}>◀ Prev</button>
      <span>Page {pager.page} of {pager.pageCount}</span>
      <button disabled={!canNext} onClick={onNext}>Next ▶</button>
    </div>
  );
}