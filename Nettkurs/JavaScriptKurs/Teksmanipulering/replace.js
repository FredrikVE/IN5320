import assert from "assert";

/*
const wrongTitle = "The Man From Mars"
const title = wrongTitle.replace("Man From Mars",
                                 "Martian")
console.log(title) // "The Martian"
*/

function kawaiify(string) {
    return string.replace("What", "NANI");
}


console.log(kawaiify("What!"));
console.log(kawaiify("A sparkling vampire. What!?"));
console.log(kawaiify("Say: What What"));

assert(kawaiify("What!") === "NANI!");
assert(kawaiify("A sparkling vampire. What!?") === "A sparkling vampire. NANI!?");
assert(kawaiify("Say: What What") === "Say: NANI What");