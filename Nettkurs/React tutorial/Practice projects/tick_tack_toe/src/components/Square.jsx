//src/components/Square.jsx
import "../styles/Squares.css";

export default function Square( props ) {
    let squareClass = "square";
    if (props.value === "X") {
        squareClass += " square-x";
    } 
    else if (props.value === "O") {
        squareClass += " square-o";
    }

    return (
        <button className= {squareClass} onClick={props.onSquareClick}>
        {props.value}
        </button>
    );
}