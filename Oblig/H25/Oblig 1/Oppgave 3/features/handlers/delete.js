//src/features/handlers/delete.js
// Sletter gitt item og rerendrer
export function handleDelete(item, state, render) {
  const id = typeof item === "string" ? null : item.id;
  state.items = id
    ? state.items.filter(it => it.id !== id)
    : state.items.filter(it => it.label !== item);
  render();
}
