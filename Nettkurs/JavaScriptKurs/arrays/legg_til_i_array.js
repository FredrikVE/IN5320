const navn = ["Bob", "Alice", "Oscar"];

// for const IN [datatype] printer ut indeks-possisjon
/*
console.log("Opprinnelig liste");
for (const i in navn) {
    console.log(i);
}
*/

// const i of [datatype] printer ut VERDI.
console.log("Opprinnelig liste");
for (const i of navn) {
    console.log(i);
}

console.log("\n")


navn[0] = "Truls"
console.log("Endrer navn ved kjent indekspossisjon \n",navn, "\n");


navn.push("Rolf");
console.log("Bruker push til å legge inn bakerst i datastrukturen \n", navn, "\n")

const j = 2
const antFjernes = 0;
navn.splice(j, antFjernes, "Kåre")
console.log("Bruker splice til å legge til element på ønsket ideks midt i\n", navn, "\n")


