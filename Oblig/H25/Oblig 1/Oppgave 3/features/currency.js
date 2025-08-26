//src/features/currency.js
import { addCurrency } from "../components/currencyList.js";

export function initCurrency() {
  const input = document.getElementById("currencyInput");
  const addBtn = document.getElementById("addBtn");
  const list  = document.getElementById("currencyList");
  if (!input || !addBtn || !list) return;

  function handleAdd() {
    const value = input.value.trim();
    if (!value) return;
    addCurrency(list, value);
    input.value = "";
    input.focus();
  }

  addBtn.addEventListener("click", handleAdd);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAdd();
  });
}
