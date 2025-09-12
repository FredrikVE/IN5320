// useEffect = React Hook som sier til React GJØR NOE KODE NÅR (velg ett):
//       Denne komponenten re-renderes
//       Denne komponenten mountes
//       En verdi i state endres

// useEffect(funksjon, [avhengigheter])

// 1. useEffect(() => {})          // Kjører etter hver re-render
// 2. useEffect(() => {}, [])      // Kjører bare når komponenten mountes
// 3. useEffect(() => {}, [verdi1, verdi2]) // Kjører når komponenten mountes + når "verdi1" eller "verdi2" endres

// BRUKSOMRÅDER
// #1 Legge til Event Listeners
// #2 Manipulere DOM
// #3 Subscriptions (sanntids-oppdateringer)
// #4 Hente data fra et API
// #5 Rydde opp når en komponent unmountes


import { useState, useEffect } from "react";


export default function MyComponent() {

    //deklarer hooks
    const [height, setHeight] = useState(window.innerHeight);   //browser høyde
    const [width, setWidth] = useState(window.innerWidth);      //browser bredde


    //useEffect( () => {})
    useEffect( () => {
        window.addEventListener("resize", handleResize);
        console.log("EVENT LISTENER ADDED");


         //Legger til en return for å bruke "cleanUp" når komponenten enten re-rendres eller unmountes
        return () => {
            window.removeEventListener("resize", handleResize);
            console.log("EVENT LISTENER REMOVED");
        }

    }, 
    //legger til tom dependancy array for å ikke legge til unødvenig mange eventlisteners.
    //hvis vi ikke har tom dependancy array her, legges det til en ny E.L. HVER GANG browser endrer seg
    []  //legger til tom dependany array for å kun legge til én eventlisteners.
    );

    useEffect(() => {
        document.title = `Size: ${width} x ${height}`;
    },
    [width, height] //legger inn width og height i dependancy arrayet
    );


    const handleResize = () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
    }

    return (
        <>
            <p>Window width: {width}px</p>
            <p>Window height: {height}px</p>
        </>
    );
}