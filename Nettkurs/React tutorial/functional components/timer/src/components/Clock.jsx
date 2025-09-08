import { useState, useEffect } from "react";

export default function Clock () {

     // Oppretter en state-variabel "date", starter med nåværende tidspunkt
    const [date, setDate] = useState(new Date()); 

    useEffect( () => {                         // useEffect: kjører side-effekter når komponenten lastes inn
        const timerID = setInterval( () => {   // Starter et intervall som kjører hvert 1000ms (1 sekund)
            setDate(new Date());               // Oppdaterer "date" med et nytt Date-objekt → trigger re-render
        }, 1000)

        return () => clearInterval(timerID);   // Rydd opp: stopper intervallet når komponenten fjernes (unmount)

    },
    []
    );

    return <h2> { date.toLocaleTimeString() } </h2> // Viser klokkeslettet fra state i UI
}
