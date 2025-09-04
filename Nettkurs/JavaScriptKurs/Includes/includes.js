import assert from "assert";

let string1 = "This super mediocre thing was awesome!"
let string2 = "Awesome, let us do that!"
let string3 = "Brilliant!"
let string4 = "To us — richer and cleverer than everyone else!"

function isAmerican(inputString) {
    return inputString.toLowerCase().includes("awesome");
}

let test1 = isAmerican(string1)
let test2 = isAmerican(string2)
let test3 = isAmerican(string3)
let test4 = isAmerican(string4)

console.log(test1);
console.log(test2);
console.log(test3);
console.log(test4);

assert(test1 === true);
assert(test2 === true);
assert(test3 === false);
assert(test4 === false);