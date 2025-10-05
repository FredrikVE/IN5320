const numbers = [1,2,3,4,5,6];



// .map()
const doubled = numbers.map( 
    (x) => x*2
);

console.log(doubled)



// .filter()
const evens = numbers.filter(
    (n) => (n % 2 === 0)
)

console.log(evens);


const odd = numbers.filter(
    (n) => (n % 3 === 0)
)

console.log(odd)




const sum = numbers.reduce(
    (a, b) => (a + b)
)

console.log(sum)
