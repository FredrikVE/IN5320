import { filterByPrefix, startsWithIgnoreCase } from "../utils/search.js";

console.log(startsWithIgnoreCase("Fortran", "For"));  // true
console.log(startsWithIgnoreCase("Fortran", "Java")); // false

const arr = [
  "Australian dollar",
  "United States dollar",
  "Chilean peso",
  "United Arab Emirates dirham",
  "Norwegian Kroner",
  "Sterling",
];

console.log(filterByPrefix(arr, "Uni"));
// forventet: ["United States dollar", "United Arab Emirates dirham"]
