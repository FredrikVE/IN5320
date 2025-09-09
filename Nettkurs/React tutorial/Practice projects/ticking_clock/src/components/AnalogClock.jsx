import { useState, useEffect } from "react";
import ClockNumbers from "../components/ClockNumbers";
import ClockTicks from "../components/ClockTicks";
import ClockHand from "../components/ClockHand";

export default function AnalogClock() {
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
        <ClockHand type="hour" angle={hourDeg} />
        <ClockHand type="minute" angle={minuteDeg} />
        <ClockHand type="second" angle={secondDeg} />

        {/* prikk i midten som visere "feste" for visere */}
        <div className="center-dot" />

        {/* Digital klokke */}
        <div className="digital">{time.toLocaleTimeString()}</div>
      </div>
    </div>
  );
}
