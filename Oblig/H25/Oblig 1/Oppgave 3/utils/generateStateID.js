//src/utils/generateStateID.js

// src/utils/generateStateID.js
export function createIdGenerator(prefix = "id") {
  let next = 1;
  return () => `${prefix}-${next++}`;
}


/*
let nextId = 1;

export function generateUniqueID(prefix = "id") {
  return `${prefix}-${nextId++}`;
}
*/

// (valgfritt, nyttig i tester)
// export function __resetIDs(start = 1) { nextId = start; }
