const eye = {
  death: "lighter than a feather",
  duty: "heavier than a mountain"
}

console.log(eye.death) // "lighter than a feather"
console.log(eye.hasOwnProperty("death")) // true

delete eye.death
console.log(eye.death) // undefined
console.log(eye.hasOwnProperty("death")) // false