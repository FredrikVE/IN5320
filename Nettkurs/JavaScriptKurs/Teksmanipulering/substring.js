import assert from "assert";
/*
Define a new function with the name myReplace(source, pattern, replacement)

the function should replace the first occurrence of the pattern with the replacement of the source string.

In other words we're implementing a simplified version of the replace method.

Assumptions:
- Pattern will match at least once.

Restrictions:
- Use of replace or replaceAll is forbidden.

Tips:
- Use a combination of indexOf, substring and concat.

*/

function myReplace(source, pattern, replacement) {
    let patternStart = source.indexOf(pattern) // finner start-indeks for pattern
    let patternEnd = patternStart + pattern.length;  // finner sluttindeks for pattern som skal byttes ut
    
    let firstHalf = source.substring(0, patternStart);  //alt før pattern
    let secondHalf = source.substring(patternEnd) // alt etter slutten på møsnteret

    let result = firstHalf + replacement + secondHalf

    return result;
}

assert(myReplace("The past is what I say it is.", "I", "they") === "The past is what they say it is.");
assert(myReplace("Fire", "Fire", "Earth") === "Earth");
assert(myReplace("Water Fire Fire", "Fire", "Earth") === "Water Earth Fire");

//alternativ syntaks med arrowfunction
const myReplace2 = (source, pattern, replacement) => {

    let patternStart = source.indexOf(pattern) // finner start-indeks for pattern
    let patternEnd = patternStart + pattern.length;  // finner sluttindeks for pattern som skal byttes ut
    
    let firstHalf = source.substring(0, patternStart);  //alt før pattern
    let secondHalf = source.substring(patternEnd) // alt etter slutten på møsnteret

    let result = firstHalf + replacement + secondHalf

    return result;
}


assert(myReplace2("The past is what I say it is.", "I", "they") === "The past is what they say it is.");
assert(myReplace2("Fire", "Fire", "Earth") === "Earth");
assert(myReplace2("Water Fire Fire", "Fire", "Earth") === "Water Earth Fire");