import assert from "assert";

const isAmerican = (inputString) => {
  if (inputString.toLowerCase().includes("awesome")) {
    return true;
  }
  return false;
};

//Tester med assert
assert.strictEqual(isAmerican("This super mediocre thing was awesome!"), true);
assert.strictEqual(isAmerican("Awesome, let us do that!"), true);
assert.strictEqual(isAmerican("That sounds aWeSOme!"), true);
assert.strictEqual(isAmerican("Brilliant!"), false);
assert.strictEqual(isAmerican("To us — richer and cleverer than everyone else!"), false);

console.log("All tests passed!");
