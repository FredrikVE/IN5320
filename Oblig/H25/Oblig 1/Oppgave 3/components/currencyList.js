//src/components/currencyList.js
export function addCurrency(listEl, text) {
  const li = document.createElement("li");
  li.textContent = text;
  listEl.appendChild(li);
  return li; // nyttig i neste steg (Delete)
}
