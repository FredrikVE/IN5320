const numberlist = [1,2,3,4]

console.log(numberlist)             // [ 1, 2, 3, 4 ]
console.log(...numberlist)          // 1 2 3 4



const b = [...numberlist, 5]     // [ 1, 2, 3, 4, 5 ]
console.log(b)


const c = [6, 7]
const d = [8, 9]
const e = [10]


const totalList = b.concat(c.concat(d.concat(e)))

console.log(totalList)


for (const num of totalList) {
    console.log(num)
}

totalList.push(10)
console.log(totalList)