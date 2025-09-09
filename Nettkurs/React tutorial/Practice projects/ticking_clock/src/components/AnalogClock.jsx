import { useState, useEffect } from "react";
import ClockNumbers from "../components/ClockNumbers";
import ClockTicks from "../components/ClockTicks";

function AnalogClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="analog-container">
      <div className="clock">
        <ClockNumbers />
        <ClockTicks />

        {/* visere */}
        <div className="hand hour"   style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }} />
        <div className="hand minute" style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }} />
        <div className="hand second" style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }} />

        <div className="center-dot" />
        <div className="digital">{time.toLocaleTimeString()}</div>
      </div>
    </div>
  );
}

export default AnalogClock;
