const slowMultiplication = (x, y) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(x * y)
        }, 1000) //1s = 1000 ms
    })
}


const returnedPromise = slowMultiplication(2,3)
returnedPromise.then( result => {
    console.log(`result = ${result}`)
})

console.log("Hi there")