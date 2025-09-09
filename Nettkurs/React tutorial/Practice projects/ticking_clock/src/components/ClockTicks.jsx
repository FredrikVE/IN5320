export default function ClockTicks({ radiusVar = "--r-tick" }) {
  return (
    <>
      {Array.from({ length: 60 }, (_, i) => {
        const angle = i * 6 - 90; // start kl 12
        const isBig = i % 5 === 0;
        return (
          <div
            key={i}
            className={`tick ${isBig ? "big" : "small"}`}
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translate(var(${radiusVar}))`,
            }}
          />
        );
      })}
    </>
  );
}
