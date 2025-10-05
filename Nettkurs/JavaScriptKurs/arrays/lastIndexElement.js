import assert from "assert";

const lastListElement = (list) => {
    return list[list.length - 1];
}


assert.strictEqual(lastListElement([1,2,3,4]), 4);
assert.strictEqual(lastListElement(["Bob", "Kaare"]), "Kaare")
assert.strictEqual(lastListElement([]), undefined)


console.log("All test passed!")