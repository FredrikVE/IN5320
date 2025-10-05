import assert from "assert";

const matSting = "Pizza, Burger, Sushi, Biff, Lasagne, Reker"
const matArray = matSting.split(", ")

console.log(matArray)


for (const mat of matArray) {
    console.log(`${mat} er digg`);
}



// bruke .split() som ordteller i setning

const numberOfWords = (sentence) => {
    return sentence.split(" ").length;
}


const testString1 = "Wise words are like arrows flung at your forehead. What do you do? Why, you duck of course."
assert.strictEqual(numberOfWords(testString1), 18)