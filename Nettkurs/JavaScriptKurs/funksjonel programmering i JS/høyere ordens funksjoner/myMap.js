//hardcode map

const myMap = (arr, fn) => {
    const result = []

    arr.forEach( i => 
        result.push(fn(i))
    )

    return result
}


function main() {
    const numbers = [1,2,3,4]
    const doubles = myMap(numbers, n => n*2 )
    console.log(doubles)

    //med vanlig map()
    const doubles2 = numbers.map( n => n*2 )
    console.log(doubles2)
}

main();