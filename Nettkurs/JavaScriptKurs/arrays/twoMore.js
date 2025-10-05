import assert from "assert";

const twoMore = (scores) => {
  return [scores[0]-1, ...scores, scores[scores.length -1]+1 ]
}


assert.deepStrictEqual(twoMore([1]), [0,1,2]);
assert.deepStrictEqual(twoMore([100,200,300]), [99,100,200,300,301]);

console.log("All tests passed");