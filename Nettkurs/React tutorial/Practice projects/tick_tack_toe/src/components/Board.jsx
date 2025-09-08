//src/components/Board.jsx
import calculateWinner from "../utils/ calculateWinner";
import Square from "./Square";

export default function Board( props ) {

    const handleClick = (i) => {
        if (calculateWinner(props.squares) || props.squares[i] ) {
            return;
        }
        const nextSquares = props.squares.slice();
        
        if (props.xIsNext) {
            nextSquares[i] = "X";
        }
        else {
            nextSquares[i] = "O";
        }

        props.onPlay(nextSquares);
    };

    const winner = calculateWinner(props.squares);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    }
    else {
        status = `Next player: ${props.xIsNext ? "X" : "O" }`
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={props.squares[0]} onSquareClick={() => handleClick(0)} />
                <Square value={props.squares[1]} onSquareClick={() => handleClick(1)} />
                <Square value={props.squares[2]} onSquareClick={() => handleClick(2)} />
            </div>

            <div className="board-row">
                <Square value={props.squares[3]} onSquareClick={() => handleClick(3)} />
                <Square value={props.squares[4]} onSquareClick={() => handleClick(4)} />
                <Square value={props.squares[5]} onSquareClick={() => handleClick(5)} />
            </div>
        
            <div className="board-row">
                <Square value={props.squares[6]} onSquareClick={() => handleClick(6)} />
                <Square value={props.squares[7]} onSquareClick={() => handleClick(7)} />
                <Square value={props.squares[8]} onSquareClick={() => handleClick(8)} />
            </div>
        </>
  );
}