import { getClockTicks } from "../utils/getClockTicks.js";
import { getClockTickTransform } from "../utils/getClockTickTransform.js";

export default function ClockTicks({ radiusVar = "--r-tick" }) {
  return (
    <>
      {getClockTicks().map(({ i, angle, isBig }) => (
        <div
          key={i}
          className={`tick ${isBig ? "big" : "small"}`}
          style={{ transform: getClockTickTransform(angle, radiusVar) }}
        />
      ))}
    </>
  );
}
