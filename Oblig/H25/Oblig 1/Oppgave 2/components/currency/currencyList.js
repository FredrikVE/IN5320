// src/components/currencyList.js
export function addCurrency(listEl, item, { onDelete }) {
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.label = item.label;

  const title = document.createElement("p");
  title.className = "item-title";
  title.textContent = item.label;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "delete";
  btn.setAttribute("aria-label", `Delete ${item.label}`);
  btn.textContent = "X";
  btn.addEventListener("click", () => onDelete(item));

  li.appendChild(title);
  li.appendChild(btn);
  listEl.appendChild(li);
}
