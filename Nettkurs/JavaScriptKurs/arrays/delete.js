const mat = ["Pizza", "Burger", "Sushi", "Elgkarbonader"]

//.pop() fjerner siste element
const elgkarbonader = mat.pop()
console.log(elgkarbonader)


//.shit() fjerner første element. Dette er en slags ".pop_front()"
const pizza = mat.shift()
console.log(pizza)

const merMat = ["Fiskekaker", "Ramen", "Biff", "Lammelår"]

const ramen = merMat[merMat.indexOf("Ramen")]
console.log(ramen)



//.slice() lager en ny kopi av en del av et array eller en streng, fra startindeks (inkludert) 
// til sluttindeks (ekskludert), uten å endre originalen.
// Den sletter på den måten alt som ikke er i intervallet definert av start og slutt

                                //(fra, til men ikke med)
const fiskekaker = merMat.splice(0, 1) // ["Fiskekaker", "Ramen", "Biff", "Lammelår"]
console.log(...fiskekaker)              // sletter alt etter fiskekaker