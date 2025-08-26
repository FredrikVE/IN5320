// /components/currencyList.js
export function addCurrency(listEl, item, { onDelete } = {}) {
  const text = typeof item === "string" ? item : item.label;

  const li = document.createElement("li");
  li.className = "currency-item";

  const label = document.createElement("span");
  label.className = "currency-label";
  label.textContent = text;

  const delBtn = document.createElement("button");
  delBtn.type = "button";
  delBtn.className = "delete-btn";
  delBtn.setAttribute("aria-label", `Delete ${text}`);
  delBtn.textContent = "X";

  delBtn.addEventListener("click", () => {
    onDelete?.(item);
    li.remove();
  });

  li.append(label, delBtn);
  listEl.appendChild(li);
  return li;
}
