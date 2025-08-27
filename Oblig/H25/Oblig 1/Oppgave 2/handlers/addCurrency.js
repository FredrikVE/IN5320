// Legger til ny currency og rerendrer (uten id)
export function handleAddCurrency(input, state, render) {
  const value = input.value.trim();
  if (!value) return;

  // valgfritt: duplikatsjekk (case-insensitive)
  if (state.items.some(it => it.label.toLowerCase() === value.toLowerCase())) {
    input.select();
    return;
  }

  state.items.push({ label: value });
  input.value = "";
  input.focus();
  render();
}
