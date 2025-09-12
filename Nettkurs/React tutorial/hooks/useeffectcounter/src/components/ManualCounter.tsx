import { useState } from "react";

export default function ManualCounter() {

    const [count, setCount] = useState(0);

    const add = () => {
        setCount(c => c +1);
    }

    const subtract = () => {
        setCount(c => c -1);
    }

    return(
        <div>
            <h1>Manual counter</h1>
            <p>{count}</p>
            <button onClick={subtract}>-</button>
            <button onClick={add}>+</button>
        </div>
        
    );
}