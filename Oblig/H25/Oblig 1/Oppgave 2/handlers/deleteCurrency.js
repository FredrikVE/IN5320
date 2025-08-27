// Sletter gitt item på label og rerendrer
export function handleDeleteCurrency(item, state, render) {
  const lbl = (item?.label || "").toLowerCase();
  state.items = state.items.filter(it => it.label.toLowerCase() !== lbl);
  render();
}
