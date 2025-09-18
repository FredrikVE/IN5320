/*
`.splice()` endrer en array direkte ved å 
    - fjerne, 
    - legge til 
    - eller erstatte 
elementer på en bestemt index. 

Den returnerer samtidig en ny array med de elementene som ble fjernet.

array.splice(start, deleteCount, item1, item2, ..., itemN)
*/


/* Typiske usecase:

1) Slett alle elementer etter 'valgt indeks'
    splice(valgt_index)


2) Slett ETT element på bestemt indeks posisjon

let slett_fra_indeks = 1
let antall_elementer_som_skal_slettes = 1
let fjernet = arr.splice(slett_fra_indeks, antall_elementer_som_skal_slettes);

3) Legg til element(er) på bestemt indeks

let legg_til_fra_indeks = 2;
let antall_elementer_som_skal_slettes = 0;
let elementer_som_skal_legges_til = ["X", "Y"];
let fjernet = arr.splice(legg_til_fra_indeks, antall_elementer_som_skal_slettes, ...elementer_som_skal_legges_til);

.spli(i, antFjernes, leggTil1, leggTil2)


4) Erstatt element på ønsket indeks

let j = 0;
antFjernes = 1;
nyttElem = "plumme";
arr.splice(j, antFjernes, nyttElem);

*/

console.log("\nFjern ett element på ønsket indeks");
const arr = ["banan", "kiwi", "jordbær", "eple"];

let slett_fra_indeks = 0;
let antall_elementer_som_skal_slettes = 1; //sett antal elementer som skal slettes fra indeks og bakover

arr.splice(slett_fra_indeks, antall_elementer_som_skal_slettes);    //fjerner "banan"
console.log("Etter: ", arr);    



console.log("\nLegg til element på ønsket indeks");

let i = 0;
let antFjernes = 0;
let nyttElem = "pære";
arr.splice(i, antFjernes, nyttElem);
console.log(arr);


console.log("\nErstatt element på ønsket indeks");

let j = 0;
antFjernes = 1;
nyttElem = "plumme";
arr.splice(j, antFjernes, nyttElem);
console.log(arr);
