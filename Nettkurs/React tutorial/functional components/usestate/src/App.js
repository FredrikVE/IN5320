import { useState } from 'react';
import './App.css';

function App() {

  const [count, setCount] = useState(4);

  function decrementCount() {
    setCount(prevCount => prevCount - 1)
  };

  function increaseCount() {
    setCount(prevCount => prevCount + 1)
  }

  function resetCount() {
    setCount(prevCount => 0)
  }


  return (
    <div className="app-container">

      <div className="count-container">
        <button id="increase-btn" onClick={increaseCount}>  + </button>
        <span id="count-value"> {count} </span>
        <button id="decrement-btn" onClick={decrementCount}> - </button>
      </div>
      
      <button className="reset-btn" onClick={resetCount}> Reset </button>
    </div>
  );
}

export default App;
