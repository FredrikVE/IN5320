import { useState } from "react";
import Clock from "./Clock";
import "./styles/App.css";

function App() {
  const [showClock, setShowClock] = useState(true);

  return (
    <div>
      <button onClick={() => setShowClock(!showClock)}>
        {showClock ? "Hide Clock" : "Show Clock"}
      </button>

      {showClock && <Clock />}
    </div>
  );
}

export default App;
