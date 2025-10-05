
const loudGreet = name => `GREETINGS ${name}`;

// Alternativ syntaks
/*
const loudGreet = (name) => {
    return `GREETINGS ${name}`
}
*/

const silentGreet = name => "Greetings " + name
//alternativ syntaks
/*
const silentGreet = (name) => {
    return `Greetings ${name}`}
*/

function main() {
    console.log(loudGreet("bob"));
    console.log(silentGreet("Alice"))
}
main();