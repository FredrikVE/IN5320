// Sletter gitt item (via id eller navn) og stopper ticker hvis lista blir tom
export function handleDeleteCountry(item, state, render, ticker) {
  const id = typeof item === "string" ? null : item.id;
  state.items = id
    ? state.items.filter(it => it.id !== id)
    : state.items.filter(it => it.name !== item);

  render();
  ticker?.stopIfEmpty();
}
