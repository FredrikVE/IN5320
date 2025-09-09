import { getClockNumbers } from "../utils/getClockNumbers.js";
import { getClockNumberTransform } from "../utils/getClockNumberTransform.js";

export default function ClockNumbers({ radiusVar = "--r-num" }) {
  return (
    <>
      {getClockNumbers().map(({ num, angle }) => (
        <div
          key={num}
          className="number"
          style={{ transform: getClockNumberTransform(angle, radiusVar) }}
        >
          {num}
        </div>
      ))}
    </>
  );
}
