import { useEffect, useState } from "react";

export default function AutoCounter() {

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log("Auto-Count: ", count);
    },
    [count]);

    const add = () => {
        setCount( c => c +1);
    }

    const subtract = () => {
        setCount (c => c -1);
    }

    return(
        <div>
            <h1>Auto counter</h1>
            <p>count: {count}</p>
            <button onClick={subtract}>-</button>
            <button onClick={add}>+</button>
            
        </div>
        
    );
}