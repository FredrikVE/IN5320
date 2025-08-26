
const output = document.getElementById("output")
for (let i=1; i <=10; i++ ) {
    const p = document.createElement("p");
    p.textContent = `Hello world ${i}`
    output.appendChild(p)
};