


//henter elementer fra HTML-dokumentet
const form = document.querySelector("#add-mountain-form")
const table = document.querySelector("#mountain-table")


form.addEventListener("submit", (e) => {
    e.preventDefault();     //hindrer siden i å laste på nytt

    //henter verdiene fra inputfeletene med .querySelector() og .value!
    const name = document.querySelector("#inputnavn").value;
    const hoyde = document.querySelector("#inputhoyde").value;
    const aar = document.querySelector("#inputaar").value;

    //Oppretter ny tabell-rad med .createElement()
    const newRow = document.createElement("tr");

    newRow.innerHTML = `
                        <td>${name}</td>
                        <td>${hoyde}</td>
                        <td>${aar}</td>
                        `;
    
    // legger til nytt element med i tabellen med .appenChild()
    table.appendChild(newRow)

    //tømmer inputfeltene
    form.reset();
});