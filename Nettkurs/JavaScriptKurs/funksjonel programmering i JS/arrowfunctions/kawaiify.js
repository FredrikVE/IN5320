import assert from "assert";

const kawaiify = (str) => {
  // erstatt bare første forekomst av "What"
  return str.replace("What", "NANI");
};

// Enhetstester
assert.strictEqual(kawaiify("What!"), "NANI!");
assert.strictEqual(kawaiify("A sparkling vampire. What!?"), "A sparkling vampire. NANI!?");
assert.strictEqual(kawaiify("Say: What What"), "Say: NANI What");
assert.strictEqual(kawaiify("In space, no one can hear you scream like a little girl."), "In space, no one can hear you scream like a little girl.");

console.log("All kawaiify tests passed!");
