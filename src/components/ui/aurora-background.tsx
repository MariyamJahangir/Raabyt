"use client";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 -z-10 opacity-25 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Layer 1: Purple radial — slow drift */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 30% 50%, rgba(139,92,246,0.15) 0%, transparent 70%)",
          animation: "aurora-drift-1 18s ease-in-out infinite",
        }}
      />
      {/* Layer 2: Magenta radial — counter drift */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 70% 50%, rgba(217,70,239,0.1) 0%, transparent 70%)",
          animation: "aurora-drift-2 15s ease-in-out infinite",
        }}
      />
      {/* Layer 3: Blended center morph */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 50% 50%, rgba(139,92,246,0.1) 0%, rgba(217,70,239,0.05) 50%, transparent 80%)",
          animation: "aurora-morph 20s ease-in-out infinite",
        }}
      />
    </div>
  );
}
