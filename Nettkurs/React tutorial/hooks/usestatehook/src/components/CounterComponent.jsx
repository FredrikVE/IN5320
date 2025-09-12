// React hook = Special function that allows functional components
//                         to use React features without writing class components 
//                         (useState, useEffect, useContext, useReducer, and more...)                

// useState() = A React hook that allows the creation of a stateful variable
//                       AND a setter function to update its value in the Virtual DOM.
//                       [name, setName]

import { useState } from "react";

export default function Counter() {

    const [count, setCount] = useState(0);

    const changeCount = (amount) => {
        setCount(count + amount);
    }

    const resetCount = () => {
        setCount(0);
    }

    return (
        <div>
            <h1>Counter</h1>
            <p>{count}</p>
            <button onClick={() => changeCount(-1)}>-</button>
            <button onClick={() => resetCount()}>Reset</button>
            <button onClick={() => changeCount(1)}>+</button>
            
        </div>
    );
}