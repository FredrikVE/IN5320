export default function ClockHand({ type, angle }) {
  return (
    <div
      className={`hand ${type}`}
      style={{ transform: `translateX(-50%) rotate(${angle}deg)` }}
    />
  );
}
