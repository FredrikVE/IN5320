import React, { useState, useEffect } from "react";
import "../styles/Clock.css"; // importer CSS-filen

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock-container">
      <div className="clock-card">
        <h1 className="clock-title">Digital Clock</h1>
        <h2 className="clock-time">{time.toLocaleTimeString()}</h2>
        <p className="clock-date">{time.toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default Clock;
