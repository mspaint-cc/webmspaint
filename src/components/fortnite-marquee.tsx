"use client";

export default function FortniteMarquee() {
  const text = Array.from({ length: 24 })
    .map((_, i) => (i % 4 === 0 ? "FORTNITE" : i % 4 === 1 ? "Fortnite" : i % 4 === 2 ? "FORTNITE BATTLE ROYALE" : "FORTNTIE"))
    .join("  •  ");

  const commonStyle: React.CSSProperties = {
    pointerEvents: "none",
    position: "fixed",
    left: 0,
    right: 0,
    height: 40,
    overflow: "hidden",
    zIndex: 2147483646,
    mixBlendMode: "screen",
    color: "#fff",
    textShadow:
      "0 0 6px rgba(255,255,255,0.9), 0 0 14px #00ffee, 0 0 20px #ff00aa",
    fontWeight: 900,
    letterSpacing: 2,
    whiteSpace: "nowrap",
  };

  const rowStyle: React.CSSProperties & { [key: string]: string | number } = {
    display: "inline-block",
    paddingInline: 24,
    animation: "marquee 12s linear infinite",
    willChange: "transform",
    "--gap": "2rem",
  };

  return (
    <>
      <div aria-hidden style={{ ...commonStyle, top: 0, fontSize: 18 }}>
        <div style={rowStyle}>{text}</div>
      </div>
      <div
        aria-hidden
        style={{
          ...commonStyle,
          bottom: 0,
          fontSize: 18,
        }}
      >
        <div style={{ ...rowStyle, animationDirection: "reverse" }}>{text}</div>
      </div>
    </>
  );
}
