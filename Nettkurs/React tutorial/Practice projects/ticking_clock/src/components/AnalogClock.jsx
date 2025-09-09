import  { useState, useEffect } from "react";
import "../styles/AnalogClock.css";

function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // regn ut rotasjonene til viserne
  const secondDeg = seconds * 6; // 360 / 60
  const minuteDeg = minutes * 6 + seconds * 0.1; // litt bevegelse per sekund
  const hourDeg = (hours % 12) * 30 + minutes * 0.5; // 360 / 12

  return (
    <div className="analog-container">
      <div className="clock">
        <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }} />
        <div className="hand minute" style={{ transform: `rotate(${minuteDeg}deg)` }} />
        <div className="hand second" style={{ transform: `rotate(${secondDeg}deg)` }} />
        <div className="center-dot" />

        <div className="digital">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}

export default AnalogClock;
