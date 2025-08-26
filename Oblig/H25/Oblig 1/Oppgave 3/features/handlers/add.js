//src/features/handlers/add.js

// Legger til ny currency og rerendrer
export function handleAdd(input, state, genId, render) {
  const value = input.value.trim();
  if (!value) return;
  state.items.push({ id: genId(), label: value });
  input.value = "";
  input.focus();
  render();
}

