//src/components/CurrencyItem.js
export function CurrencyItem(name) {
  const li = document.createElement("li");
  li.className = "item";
  li.dataset.name = name;

  const title = document.createElement("p");
  title.className = "item-title";
  title.textContent = name;

  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "delete";
  btn.setAttribute("title" ,`Delete ${name}`);
  btn.textContent = "X";

  li.append(title, btn);
  return li;
}
