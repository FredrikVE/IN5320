//array.splice(startIndex, deleteCount, item1, item2, ...)

/*
0 betyr "fjern ingen, bare legg til hvis du sender inn nye verdier".
3 betyr "fjern tre elementer, og legg evt. til nye hvis du sender inn dem".

*/


let array = [1,2,4];

for (let i = 0; i < array.length; i++) {
    if (array[i] === 2) {
        array.splice(i + 1, 0, 3); // legg inn 2, slett 0 og legg inn 3 etter 2, 
        break;
    }
}


console.log(array)


/*
Nei, alle parameterne i splice() er ikke påbudt — du kan bruke bare noen av dem, og JavaScript fyller inn standardverdier for resten.

La oss se på syntaksen igjen:

array.splice(startIndex, deleteCount, item1, item2, ...)

1. Bare startIndex

Hvis du bare gir startIndex, fjerner splice alle elementene fra den indeksen og ut til slutten:

let arr = [1, 2, 3, 4];
arr.splice(2);

console.log(arr); // [1, 2]

2. startIndex + deleteCount

Da kan du velge hvor mange elementer som skal fjernes:

let arr = [1, 2, 3, 4];
arr.splice(1, 2); 

console.log(arr); // [1, 4]


Starter på indeks 1, fjerner 2 elementer (2 og 3).

*/