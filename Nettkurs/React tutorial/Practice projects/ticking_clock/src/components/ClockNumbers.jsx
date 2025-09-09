export default function ClockNumbers({ radiusVar = "--r-num" }) {
  return (
    <>
      {Array.from({ length: 12 }, (_, i) => {
        const num = i + 1;
        const angle = num * 30 - 90; // 12 oppe
        return (
          <div
            key={num}
            className="number"
            style={{
              // til senter → roter → skyv ut (skalert) → roter tilbake
              transform: `translate(-50%, -50%) rotate(${angle}deg) translate(var(${radiusVar})) rotate(${-angle}deg)`,
            }}
          >
            {num}
          </div>
        );
      })}
    </>
  );
}
