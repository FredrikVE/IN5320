import "./Count.css"
import { useState } from "react"

export default function Counter() {
  const [count, setCount] = useState(0);

  /*
  // stil 1: funksjonsdeklarasjon
  // best hvis man putter hjelpe funksjoner i "utils-mappe"
  function changeCount(amount) {
    setCount(prevCount => prevCount + amount);
  }
  */

  // stil 2: "arrow-function notasjon"
  // Denne kan være fin å bruke i funksjons-komponeneter for å skille tydeligere
  // mellom hva som er "hovedfunksjon" og hjelpefunksjoner.
  const changeCount = (amount) => {
    setCount(prevCount => prevCount + amount);
  }

  function resetCount() {
    setCount(0);
  }

  return (
    <div className="app-container">
        <div className="counter-row">
            <button id="increase-btn" onClick={() => changeCount(1)}>+</button>
            <span id="counter-value">{count}</span>
            <button id="decrease-btn" onClick={() => changeCount(-1)}>-</button>
        </div>

        <button className="reset-btn" onClick={ () => resetCount()}>Reset</button>
    </div>
  )
};