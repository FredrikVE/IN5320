
// ordinær måte å skrive js funksjoner på
/*
function squared(n) {
    return n**2
}
*/


// Aller enklerste måte uten return
/*

const squared = n => n**2

*/

// også gyldig måte å skrive lambda på
/*
const squared = n => {
    return n**2
}
*/

// eksplisitt med parameter-notasjon rundt input-verdier for funksjonen
const squared = (n, p=2) => {
    return n**p
}




console.log(squared(4))

